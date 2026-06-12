import fs from "node:fs";
import path from "node:path";

const root = path.resolve("work/original-site/daweivalve.com_zhJnTGkYimJbnhYfYJRL/wwwroot/products");
const output = path.resolve("data/legacy-catalog.json");
const categoryPages = new Set(["ball", "butterfly", "cast_steel", "castiron", "forged_steel", "plug", "sss", "brass"]);
const categoryLabels = {
  valves: "Valves",
  fittings: "Fittings",
  pipes: "Pipes",
  flanges: "Flanges",
  castings_forgings: "Castings & Forgings",
};

const replacements = {
  aci: "ANSI Cast Iron",
  bci: "BS Cast Iron",
  dci: "DIN Cast Iron",
  cs: "Cast Steel",
  fs: "Forged Steel",
  sss: "Stainless Steel",
  gatens: "Gate Valve, Non-Rising Stem",
  gaters: "Gate Valve, Rising Stem",
  rsg: "Resilient Seated Gate Valve",
  swingcheck: "Swing Check Valve",
  pistoncheck: "Piston Check Valve",
  pressureseal: "Pressure Seal",
  floating: "Floating Ball Valve",
  trunnion: "Trunnion Ball Valve",
  globe: "Globe Valve",
  gate: "Gate Valve",
  butterfly: "Butterfly Valve",
  plug: "Plug Valve",
  ball: "Ball Valve",
  ys: "Y-Strainer",
  dig: "Ductile Iron Grooved Fittings",
  qc: "Quick Couplings",
  buttweld: "Butt-Weld Fittings",
  steel: "Steel Products",
  scaffolding: "Scaffolding Products",
  wc: "Wafer Disc",
  wt: "Wafer or Lugged",
  wt1: "Wafer or Lugged",
  tep: "Top Entry",
  bep: "Bottom Entry",
  "3pcse": "Three-Piece Ball Valve · Socket-Weld End",
  "3pcbe": "Three-Piece Ball Valve · Butt-Weld End",
  "3pclbe": "Three-Piece Ball Valve · Long Butt-Weld End",
  "3pcube": "Three-Piece Ball Valve · Union Butt-Weld End",
  "3pcce": "Three-Piece Ball Valve · Clamp End",
  "3pcwmp": "Three-Piece Ball Valve · Mounting Pad",
};

const summaryFallbacks = {
  "castings_forgings/scaffolding": "Scaffolding components and related cast and forged products supplied to project requirements.",
  "pipes/steel": "Steel pipes and related piping products supplied for industrial and infrastructure projects.",
  "valves/sss_3pcse": "Stainless steel three-piece ball valve with socket-weld ends.",
  "valves/sss_3pcbe": "Stainless steel three-piece ball valve with butt-weld ends.",
  "valves/sss_3pclbe": "Stainless steel three-piece ball valve with long butt-weld ends.",
  "valves/sss_3pcube": "Stainless steel three-piece ball valve with union butt-weld ends.",
  "valves/sss_3pcce": "Stainless steel three-piece ball valve with clamp ends.",
  "valves/sss_3pcwmp": "Stainless steel three-piece ball valve with mounting pad for actuation.",
};

const summaryOverrides = {
  "fittings/dig": "Ductile iron grooved fittings including elbows, flexible and rigid couplings, grooved flanges, tees, mechanical tees, crosses, mechanical crosses, and reducing couplings.",
  "valves/castiron_aci_gaters": "ANSI cast iron gate valve with bolted bonnet, outside screw and yoke, rising stem, and solid wedge disc. Available in Class 125 / 250 configurations.",
  "valves/forgedsteel_globe": "Forged steel globe valve available in Class 800 / 1500 / 2500 configurations, with bolted or welded bonnet and reduced-port or full-port options.",
  "valves/forgedsteel_swingcheck": "Forged steel swing check valve available in Class 800 / 1500 configurations, with bolted cover, swing-type disc, and reduced-port or full-port options.",
};

const imageFallbacks = {
  "castings_forgings/scaffolding": ["/images/original/products/fittings.gif"],
  "pipes/steel": ["/images/original/products/pipes.jpg"],
  "valves/ball_cs_trunnion": ["/legacy/products/valves/images/valves_ball_2.gif"],
  "valves/ball_fs_trunnion": ["/legacy/products/valves/images/valves_ball_3.gif"],
};

const titleOverrides = {
  "flanges/steel": "Forged Steel Flanges",
  "pipes/steel": "Steel Pipes",
  "valves/ball_cs_floating": "Cast Steel Floating Ball Valve",
  "valves/ball_cs_trunnion": "Cast Steel Trunnion Ball Valve",
  "valves/ball_fs_trunnion": "Forged Steel Trunnion Ball Valve",
  "valves/butterfly_01": "Double-Eccentric Flanged Butterfly Valve · Series 01",
  "valves/butterfly_02": "Double-Eccentric Flanged Butterfly Valve · Series 02",
  "valves/butterfly_03": "Double-Eccentric Flanged Butterfly Valve · Series 03",
  "valves/butterfly_wc": "Dual-Disc Wafer Check Valve",
  "valves/butterfly_wt": "Wafer or Lugged Butterfly Valve · Series 01",
  "valves/butterfly_wt1": "Wafer or Lugged Butterfly Valve · Series 02",
  "valves/castiron_aci_gatens": "ANSI Cast Iron Gate Valve · Non-Rising Stem",
  "valves/castiron_aci_gaters": "ANSI Cast Iron Gate Valve · Rising Stem",
  "valves/castiron_aci_globe": "ANSI Cast Iron Globe Valve",
  "valves/castiron_aci_swingcheck": "ANSI Cast Iron Swing Check Valve",
  "valves/castiron_bci_gaters": "BS Cast Iron Gate Valve · Rising Stem · PN16",
  "valves/castiron_bci_gatens10": "BS Cast Iron Gate Valve · Non-Rising Stem · PN10",
  "valves/castiron_bci_gatens16": "BS Cast Iron Gate Valve · Non-Rising Stem · PN16",
  "valves/castiron_bci_globe": "BS Cast Iron Globe Valve · PN16",
  "valves/castiron_bci_swingcheck": "BS Cast Iron Swing Check Valve · PN16",
  "valves/castiron_ciys": "Cast Iron Y-Strainer",
  "valves/castiron_dci_gaters10": "DIN Cast Iron Gate Valve · PN10",
  "valves/castiron_dci_gaters16": "DIN Cast Iron Gate Valve · PN10 / PN16",
  "valves/castiron_dci_globe": "DIN Cast Iron Globe Valve · PN16",
  "valves/castiron_rsg": "Resilient Seated Gate Valve",
  "valves/caststeel_gate": "Cast Steel Gate Valve",
  "valves/caststeel_globe": "Cast Steel Globe Valve",
  "valves/caststeel_pressuresealgate": "Cast Steel Pressure Seal Gate Valve",
  "valves/caststeel_pressuresealglobe": "Cast Steel Pressure Seal Globe Valve",
  "valves/caststeel_pressuresealswingcheck": "Cast Steel Pressure Seal Swing Check Valve",
  "valves/caststeel_swingcheck": "Cast Steel Swing Check Valve",
  "valves/dincast_01": "Ductile Iron Gate Valve · DIN F4 · DN350-DN600",
  "valves/dincast_02": "Ductile Iron Gate Valve · DIN F4 · DN350-DN1200",
  "valves/dincast_03": "Ductile Iron Gate Valve · DIN F5 · DN350-DN600",
  "valves/dincast_04": "Ductile Iron Gate Valve · DIN F5 · DN350-DN1200",
  "valves/forgedsteel_gate": "Forged Steel Gate Valve",
  "valves/forgedsteel_globe": "Forged Steel Globe Valve",
  "valves/forgedsteel_pistoncheck": "Forged Steel Piston Check Valve",
  "valves/forgedsteel_swingcheck": "Forged Steel Swing Check Valve",
  "valves/gatens_01": "Ductile Iron Gate Valve · BS 5163 · DN350-DN600",
  "valves/gatens_02": "Ductile Iron Gate Valve · BS 5163 · DN350-DN1200",
  "valves/gatens_03": "Ductile Iron Inclined Seat Swing Check Valve",
  "valves/plug_bep": "Bottom Entry Plug Valve",
  "valves/plug_tep": "Top Entry Plug Valve",
  "valves/sss_1pc1000wog": "One-Piece Stainless Steel Ball Valve · 1000 WOG",
  "valves/sss_2pc1000wog": "Two-Piece Stainless Steel Ball Valve · 1000 WOG",
  "valves/sss_2pc1000wogwmp": "Two-Piece Stainless Steel Ball Valve · 1000 WOG · Mounting Pad",
  "valves/sss_2pc2000wog": "Two-Piece Stainless Steel Ball Valve · 2000 WOG",
  "valves/sss_3pcte": "Three-Piece Stainless Steel Ball Valve · 1000 WOG",
  "valves/sss_3wbv": "Three-Way Stainless Steel Ball Valve",
  "valves/sss_othergate": "Stainless Steel Gate Valve",
  "valves/sss_otherglobe": "Stainless Steel Globe Valve",
  "valves/sss_othersc": "Stainless Steel Swing Check Valve",
  "valves/sss_otherwfb": "Stainless Steel Wafer Flanged Ball Valve",
  "valves/sss_otherys": "Stainless Steel Y-Strainer",
  "valves/sss_otherysc": "Stainless Steel Y-Spring Check Valve",
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function cleanText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&deg;/gi, "°")
    .replace(/&#966;/gi, "φ")
    .replace(/Mechnaical/gi, "Mechanical")
    .replace(/Materialeri\s+aleri/gi, "")
    .replace(/body body/gi, "body")
    .replace(/Three-pieces/gi, "Three-piece")
    .replace(/are also can be/gi, "can also be")
    .replace(/each valves are/gi, "each valve is")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFor(base, category) {
  const tokens = base.toLowerCase().split("_").filter(Boolean);
  const pieces = tokens.map((token) => replacements[token] || (/^\d+$/.test(token) ? `Series ${token}` : token.replace(/\b\w/g, (c) => c.toUpperCase())));
  const title = [...new Set(pieces)].join(" · ");
  return title || categoryLabels[category];
}

function extractRows(html) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((match) => [...match[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => cleanText(cell[1])).filter(Boolean))
    .filter((row) => row.length >= 2 && row.length <= 16)
    .filter((row) => row.join(" ").length < 500)
    .slice(0, 45);
}

function extractImages(html, category) {
  return [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi)]
    .map((m) => m[1].replaceAll("\\", "/"))
    .filter((src) => /\/?images\/.+\.(gif|jpe?g|png)$/i.test(src))
    .filter((src) => !/lm_|rm_|site|topbanner|maintop|certification|spacer|print|line|arrow|logo/i.test(src))
    .map((src) => {
      let name = src.split("/").pop();
      if (!fs.existsSync(path.join(root, category, "images", name))) {
        const alternate = name.replace(/a(\.(gif|jpe?g|png))$/i, "$1");
        if (fs.existsSync(path.join(root, category, "images", alternate))) name = alternate;
      }
      return `/legacy/products/${category}/images/${name}`;
    })
    .filter((src) => fs.existsSync(path.join("public", src)));
}

const files = walk(root).filter((f) => f.endsWith(".asp") && !f.includes(`${path.sep}old${path.sep}`) && !f.includes(`${path.sep}web${path.sep}`));
const groups = new Map();

for (const file of files) {
  const rel = path.relative(root, file);
  const [category] = rel.split(path.sep);
  const rawBase = path.basename(file, ".asp");
  const normalized = rawBase.replace(/_dw\d*$/i, "").toLowerCase();
  if (categoryPages.has(normalized)) continue;
  const key = `${category}/${normalized}`;
  if (!groups.has(key)) groups.set(key, { category, base: normalized, files: [] });
  groups.get(key).files.push(file);
}

const products = [...groups.values()].map((group) => {
  const htmls = group.files.map((file) => fs.readFileSync(file, "utf8"));
  const combined = htmls.join("\n");
  const text = cleanText(combined)
    .replace(/Dalian Dawei International Co\.,? Ltd\.?/gi, "")
    .replace(/Welcome to WWW\.DAWEIVALVE\.COM/gi, "")
    .replace(/© 2003-2004[\s\S]*$/i, "")
    .trim();
  const images = [...new Set(htmls.flatMap((html) => extractImages(html, group.category)))];
  const rows = extractRows(combined);
  const fallbackKey = `${group.category}/${group.base}`;
  return {
    slug: `${group.category}-${group.base}`.replaceAll("_", "-"),
    category: categoryLabels[group.category] || group.category,
    categorySlug: group.category,
    title: titleOverrides[fallbackKey] || titleFor(group.base, group.category),
    sourceFiles: group.files.map((file) => path.basename(file)),
    images: images.length ? images : (imageFallbacks[fallbackKey] || []),
    summary: summaryOverrides[fallbackKey] || text.split(/Material Specification|Dimensions|Dimension Table|No\. Name of part/i)[0].slice(0, 650) || summaryFallbacks[fallbackKey] || `${titleFor(group.base, group.category)} supplied to project requirements. Contact Dawei for specifications and availability.`,
    tableRows: rows,
    reviewStatus: "Historical archive content — confirm current availability and specifications before publishing.",
  };
}).sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

fs.writeFileSync(output, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Extracted ${products.length} consolidated products from ${files.length} ASP pages.`);
console.log(Object.entries(Object.groupBy(products, (p) => p.category)).map(([k, v]) => `${k}: ${v.length}`).join("\n"));
