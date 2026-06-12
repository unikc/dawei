import fs from "node:fs";

const base = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3000";
const catalog = JSON.parse(fs.readFileSync("data/legacy-catalog.json", "utf8"));
const categories = ["ductile-iron-gate-valves", "ductile-iron-butterfly-valves", "ductile-iron-check-valves", "air-valves", "strainers", "other-valves", "fittings", "pipes", "flanges"];
const routes = ["/", "/products", "/industries", "/quality", "/about", "/contact", "/catalog", ...categories.map((s) => `/products/${s}`), ...catalog.map((p) => `/products/detail/${p.slug}`)];
const issues = [];
const checkedAssets = new Set();

for (const route of routes) {
  const response = await fetch(`${base}${route}`, { redirect: "manual" });
  if (![200, 307, 308].includes(response.status)) issues.push(`${route}: HTTP ${response.status}`);
  if (response.status !== 200) continue;
  const html = await response.text();
  if (!/<h1\b/i.test(html)) issues.push(`${route}: missing h1`);
  if (/original archive|historical product|consolidated historical|archive sources/i.test(html)) issues.push(`${route}: internal migration language exposed`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    const asset = match[1];
    if (asset.startsWith("/_next/") || asset.startsWith("/products/") || asset.startsWith("/contact") || asset.startsWith("/quality") || asset.startsWith("/about") || asset.startsWith("/industries") || asset === "/") continue;
    if (checkedAssets.has(asset)) continue;
    checkedAssets.add(asset);
    const assetResponse = await fetch(`${base}${asset}`, { redirect: "manual" });
    if (assetResponse.status !== 200) issues.push(`${route}: broken asset/link ${asset} (${assetResponse.status})`);
  }
}

console.log(JSON.stringify({ routesChecked: routes.length, assetsChecked: checkedAssets.size, issues }, null, 2));
if (issues.length) process.exitCode = 1;
