import fs from "node:fs";
import path from "node:path";

const catalog = JSON.parse(fs.readFileSync("data/legacy-catalog.json", "utf8"));
const root = path.resolve("work/original-site/daweivalve.com_zhJnTGkYimJbnhYfYJRL/wwwroot/products");
const issues = [];
const mapped = new Set();

for (const product of catalog) {
  for (const source of product.sourceFiles) {
    const file = path.join(root, product.categorySlug, source);
    mapped.add(file);
    if (!fs.existsSync(file)) issues.push(`${product.slug}: missing source ${file}`);
  }
  for (const image of product.images) {
    const file = path.join("public", image);
    if (!fs.existsSync(file)) issues.push(`${product.slug}: missing public image ${image}`);
  }
  if (!product.title.trim()) issues.push(`${product.slug}: empty title`);
  if (!product.summary.trim()) issues.push(`${product.slug}: empty summary`);
  if (product.tableRows.some((row) => row.length < 2 || row.some((cell) => !String(cell).trim()))) {
    issues.push(`${product.slug}: malformed table row`);
  }
}

const activeAsp = [];
for (const category of fs.readdirSync(root)) {
  const dir = path.join(root, category);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const name of fs.readdirSync(dir)) {
    if (name.toLowerCase().endsWith(".asp")) activeAsp.push(path.join(dir, name));
  }
}

const intentionalCategoryPages = new Set(["ball.asp", "butterfly.asp", "cast_steel.asp", "castiron.asp", "forged_steel.asp", "plug.asp", "sss.asp", "brass.asp"]);
const unmapped = activeAsp.filter((file) => !mapped.has(file) && !intentionalCategoryPages.has(path.basename(file).toLowerCase()));

console.log(JSON.stringify({
  catalogProducts: catalog.length,
  sourcePagesMapped: mapped.size,
  activeAspPages: activeAsp.length,
  intentionallyExcludedCategoryPages: activeAsp.filter((f) => intentionalCategoryPages.has(path.basename(f).toLowerCase())).length,
  unmappedPages: unmapped.map((f) => path.relative(root, f)),
  productsWithoutImages: catalog.filter((p) => !p.images.length).map((p) => p.slug),
  productsWithoutSummary: catalog.filter((p) => !p.summary.trim()).map((p) => p.slug),
  productsWithoutTables: catalog.filter((p) => !p.tableRows.length).map((p) => p.slug),
  issues,
}, null, 2));

if (issues.length || unmapped.length) process.exitCode = 1;
