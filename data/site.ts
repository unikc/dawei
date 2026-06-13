export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  applications: string[];
  specs: string[];
  featured?: boolean;
  type: "gate" | "butterfly" | "check" | "air" | "strainer" | "other" | "fitting" | "pipe" | "flange";
  image: string;
};

export const products: Product[] = [
  { slug: "ductile-iron-gate-valves", name: "Metal Seated Gate Valves", short: "Ductile iron metal seated gate valves for waterworks.", description: "A primary Dawei product range focused on ductile iron metal seated gate valves for water transmission, treatment, and municipal infrastructure projects.", applications: ["Waterworks", "Municipal infrastructure", "Transmission pipelines"], specs: ["DN350-DN1200", "PN10 / PN16", "BS 5163 and DIN F4 / F5 options"], featured: true, type: "gate", image: "/images/original/products/gate-valve.gif" },
  { slug: "ductile-iron-check-valves", name: "Ductile Iron Check Valves", short: "Swing and non-return protection for pipelines.", description: "Swing and specialty check valve options selected for hydraulic performance and service conditions.", applications: ["Pump stations", "Water networks", "Industrial projects"], specs: ["Swing and specialty types", "DN50-DN1000", "ANSI, BS, DIN options"], featured: true, type: "check", image: "/images/original/products/check-valve.gif" },
  { slug: "air-valves", name: "Air Valves", short: "Air release and vacuum protection for pipeline efficiency.", description: "Single and double-orifice air valve solutions for filling, draining, and ongoing pipeline operation.", applications: ["Transmission mains", "Irrigation", "Wastewater"], specs: ["Single and double orifice", "PN10 / PN16 / PN25", "Ductile iron body"], featured: true, type: "air", image: "/images/original/products/air-valve.gif" },
  { slug: "ductile-iron-butterfly-valves", name: "Flanged Double Eccentric Butterfly Valves", short: "Ductile iron flanged double eccentric butterfly valves.", description: "A primary Dawei product range focused on ductile iron flanged double eccentric butterfly valves for dependable isolation and flow control in waterworks systems.", applications: ["Water treatment", "Municipal networks", "Infrastructure projects"], specs: ["Double flanged", "Double eccentric design", "Gearbox and actuation options"], featured: true, type: "butterfly", image: "/images/original/products/butterfly-valve.gif" },
  { slug: "strainers", name: "Strainers", short: "Cast iron and steel Y-strainers.", description: "Durable Y-strainers and basket strainers for removing solids and protecting valves, meters, and pumps.", applications: ["Pump protection", "HVAC", "Process water"], specs: ["Iron and steel Y-strainers", "Stainless steel screens", "Flanged connections"], featured: true, type: "strainer", image: "/images/original/products/strainer.gif" },
  { slug: "other-valves", name: "Other Valves", short: "Additional valve types available for project packages.", description: "Additional cast iron, steel, stainless steel, ball, plug, globe, and specialty valve configurations remain available for broader project requirements.", applications: ["Industrial projects", "Process systems", "OEM supply"], specs: ["API, ANSI, DIN, BS, JIS", "Multiple materials", "Actuation options"], type: "other", image: "/images/original/products/other-valve.gif" },
  { slug: "fittings", name: "Fittings", short: "Ductile iron, stainless, brass, and butt-weld fittings.", description: "A broad supporting range for customers consolidating valve and piping requirements.", applications: ["Waterworks", "Municipal networks", "Industrial projects"], specs: ["Grooved and flanged", "Standard and custom sizes", "Multiple materials"], type: "fitting", image: "/images/original/products/fittings.gif" },
  { slug: "pipes", name: "Pipes", short: "Piping supply coordinated with valve packages.", description: "Pipe products and accessories supplied for international infrastructure and industrial projects.", applications: ["Water transmission", "Infrastructure", "Industrial utilities"], specs: ["Project-specific supply", "Multiple materials", "Export packaging"], type: "pipe", image: "/images/original/products/pipes.jpg" },
  { slug: "flanges", name: "Flanges", short: "Standard and project-specific steel flanges.", description: "A broad supporting flange range for valve installation, piping connections, and maintenance needs.", applications: ["Piping systems", "Maintenance", "OEM supply"], specs: ["EN, ANSI, BS, DIN", "Multiple pressure classes", "Custom drilling available"], type: "flange", image: "/images/original/products/flanges.gif" },
];

export const industries = [
  ["Waterworks", "Reliable isolation, control, and pipeline protection for treatment and distribution networks."],
  ["Municipal Infrastructure", "Valve packages built around the practical needs of public utility projects."],
  ["HVAC", "Efficient flow control solutions for commercial and district energy systems."],
  ["Fire Protection", "Project-oriented valve supply for fire water and suppression systems."],
  ["Industrial Projects", "Flexible sourcing for utilities, process support, and engineered project packages."],
];
