import fs from "node:fs";
import path from "node:path";

const sourceDirectory = process.argv[2] ?? "/private/tmp/sino-priority/details";
const outputFile = path.resolve("data/sino-priority-products.json");

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
    .replace(/&#189;/gi, "½")
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

const products = fs.readdirSync(sourceDirectory)
  .filter((fileName) => fileName.endsWith(".html"))
  .sort()
  .map((fileName) => {
    const html = fs.readFileSync(path.join(sourceDirectory, fileName), "utf8");
    const category = categoryForFile(fileName);
    const titleBlock = html.match(/<div class="zq_right_2">([\s\S]*?)<\/div>/i)?.[1] ?? "";
    const title = cleanText(titleBlock.replace(/<a[\s\S]*?<\/a>/i, "").replace(/<span[\s\S]*?<\/span>/i, ""));
    const range = cleanText(titleBlock.match(/<span[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? "");
    const productImage = html.match(/<div class="zq_right_3">[\s\S]*?<img src="images\/([^"]+)"/i)?.[1];
    const imageMatches = [...normalizeDetailHtml(html).matchAll(/src="(\/images\/sino\/[^"]+)"/gi)].map((match) => match[1]);
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
      detailHtml: normalizeDetailHtml(html),
    };
  });

fs.writeFileSync(outputFile, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Imported ${products.length} priority products into ${outputFile}`);
