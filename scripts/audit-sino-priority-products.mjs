import fs from "node:fs";
import path from "node:path";

const sourceDirectory = process.argv[2] ?? "/private/tmp/sino-audit-current/details";
const dataFile = path.resolve("data/sino-priority-products.json");

const categories = {
  "1-1-2": { slug: "ductile-iron-gate-valves", name: "Metal Seated Gate Valves", navigation: "Gate Valves" },
  "1-2": { slug: "ductile-iron-butterfly-valves", name: "Butterfly Valves", navigation: "Butterfly Valves" },
  "1-4": { slug: "ductile-iron-check-valves", name: "Ductile Iron Check Valves", navigation: "Check Valves" },
  "1-6": { slug: "air-valves", name: "Air Valves", navigation: "Air Valves" },
};

function cleanText(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#189;/gi, "1/2")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryForFile(fileName) {
  const key = Object.keys(categories).find((prefix) => fileName.startsWith(prefix));
  if (!key) throw new Error(`No category mapping for ${fileName}`);
  return categories[key];
}

function slugForFile(fileName) {
  return `sino-${fileName.replace(/\.html$/, "").toLowerCase()}`;
}

function normalizeDetailHtml(html) {
  const start = html.indexOf('<div class="zq_right_3">');
  const end = html.indexOf('<div class="zq_right_4">');
  if (start < 0 || end < 0) throw new Error("Product detail boundaries not found");

  return html
    .slice(start, end)
    .replace(/src="images\/([^"]+)"/gi, 'src="/images/sino/$1"')
    .replace(/"{2,}/g, '"')
    .replace(/\s(?:alt|width|height|align|cellpadding|cellspacing|valign|border|style)="[^"]*"/gi, "")
    .replace(/\s(?:width|height|rowspan|colspan|valign|align|style)='[^']*'/gi, "")
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "")
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "")
    .replace(/<p>\s*&nbsp;\s*<\/p>/gi, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+-\s+24"\)/g, "")
    .trim();
}

function parseProduct(fileName) {
  const html = fs.readFileSync(path.join(sourceDirectory, fileName), "utf8");
  const category = categoryForFile(fileName);
  const titleBlock = html.match(/<div class="zq_right_2">([\s\S]*?)<\/div>/i)?.[1] ?? "";
  const title = cleanText(titleBlock.replace(/<a[\s\S]*?<\/a>/i, "").replace(/<span[\s\S]*?<\/span>/i, ""));
  const range = cleanText(titleBlock.match(/<span[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? "");
  const productImage = html.match(/<div class="zq_right_3">[\s\S]*?<img src="images\/([^"]+)"/i)?.[1];
  const detailHtml = normalizeDetailHtml(html);
  const imageMatches = [...detailHtml.matchAll(/src="(\/images\/sino\/[^"]+)"/gi)].map((match) => match[1]);
  const primaryImage = productImage ? `/images/sino/${productImage}` : imageMatches[0];

  return {
    slug: slugForFile(fileName),
    sourcePage: fileName,
    categorySlug: category.slug,
    categoryName: category.name,
    navigationCategory: category.navigation,
    title,
    range,
    summary: range ? `${title}. ${range}.` : title,
    image: primaryImage,
    images: [...new Set([primaryImage, ...imageMatches].filter(Boolean))],
    detailHtml,
  };
}

function tableCount(value) {
  return (value.match(/<table/gi) ?? []).length;
}

function categoryCounts(products) {
  return products.reduce((counts, product) => {
    counts[product.categoryName] = (counts[product.categoryName] ?? 0) + 1;
    return counts;
  }, {});
}

const expected = fs
  .readdirSync(sourceDirectory)
  .filter((fileName) => fileName.endsWith(".html"))
  .sort()
  .map(parseProduct);
const actual = JSON.parse(fs.readFileSync(dataFile, "utf8"));

const expectedBySource = new Map(expected.map((product) => [product.sourcePage, product]));
const actualBySource = new Map(actual.map((product) => [product.sourcePage, product]));

const missing = expected.filter((product) => !actualBySource.has(product.sourcePage)).map((product) => product.sourcePage);
const extra = actual.filter((product) => !expectedBySource.has(product.sourcePage)).map((product) => product.sourcePage);
const mismatches = [];

for (const expectedProduct of expected) {
  const actualProduct = actualBySource.get(expectedProduct.sourcePage);
  if (!actualProduct) continue;

  for (const field of ["slug", "categorySlug", "categoryName", "navigationCategory", "title", "range", "summary", "image"]) {
    if (actualProduct[field] !== expectedProduct[field]) {
      mismatches.push({
        sourcePage: expectedProduct.sourcePage,
        field,
        expected: expectedProduct[field],
        actual: actualProduct[field],
      });
    }
  }

  if (JSON.stringify(actualProduct.images) !== JSON.stringify(expectedProduct.images)) {
    mismatches.push({
      sourcePage: expectedProduct.sourcePage,
      field: "images",
      expected: expectedProduct.images,
      actual: actualProduct.images,
    });
  }

  if (tableCount(actualProduct.detailHtml) !== tableCount(expectedProduct.detailHtml)) {
    mismatches.push({
      sourcePage: expectedProduct.sourcePage,
      field: "tableCount",
      expected: tableCount(expectedProduct.detailHtml),
      actual: tableCount(actualProduct.detailHtml),
    });
  }

  if (actualProduct.detailHtml !== expectedProduct.detailHtml) {
    mismatches.push({
      sourcePage: expectedProduct.sourcePage,
      field: "detailHtml",
      expectedLength: expectedProduct.detailHtml.length,
      actualLength: actualProduct.detailHtml.length,
    });
  }
}

const leaks = {
  sinoValve: /sino-valve/i.test(JSON.stringify(actual)),
  sinoEmail: /info@sino/i.test(JSON.stringify(actual)),
  malformedImageTag: /<img[^>]+src=\\"[^>]*"{2,}/.test(JSON.stringify(actual)),
};

console.log(JSON.stringify({
  expectedCount: expected.length,
  actualCount: actual.length,
  expectedCategoryCounts: categoryCounts(expected),
  actualCategoryCounts: categoryCounts(actual),
  missing,
  extra,
  mismatches,
  leaks,
}, null, 2));
