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
  { slug: "ductile-iron-gate-valves", name: "Ductile Iron Gate Valves", short: "Resilient seated and metal seated gate valves.", description: "A core Dawei supply category covering non-rising stem, rising stem, resilient seated, and large-size gearbox-operated gate valves.", applications: ["Waterworks", "Municipal infrastructure", "Fire protection"], specs: ["DN50-DN1200", "PN10 / PN16 / Class 125", "EN, BS, DIN, AWWA options"], featured: true, type: "gate", image: "/images/original/products/gate-valve.gif" },
  { slug: "ductile-iron-butterfly-valves", name: "Ductile Iron Butterfly Valves", short: "Wafer, lug, and double-eccentric flow control.", description: "Concentric and double-eccentric butterfly valve solutions with lever, gearbox, electric, hydraulic, and pneumatic operation options.", applications: ["Water treatment", "HVAC", "Industrial utilities"], specs: ["Wafer, lug, and flanged", "PN10 / PN16", "Manual and actuated options"], featured: true, type: "butterfly", image: "/images/original/products/butterfly-valve.gif" },
  { slug: "ductile-iron-check-valves", name: "Ductile Iron Check Valves", short: "Swing and non-return protection for pipelines.", description: "Swing and specialty check valve options selected for hydraulic performance and service conditions.", applications: ["Pump stations", "Water networks", "Industrial projects"], specs: ["Swing and specialty types", "DN50-DN1000", "ANSI, BS, DIN options"], featured: true, type: "check", image: "/images/original/products/check-valve.gif" },
  { slug: "air-valves", name: "Air Valves", short: "Air release and vacuum protection for pipeline efficiency.", description: "Single and double-orifice air valve solutions for filling, draining, and ongoing pipeline operation.", applications: ["Transmission mains", "Irrigation", "Wastewater"], specs: ["Single and double orifice", "PN10 / PN16 / PN25", "Ductile iron body"], featured: true, type: "air", image: "/images/original/products/air-valve.gif" },
  { slug: "strainers", name: "Strainers", short: "Cast iron and steel Y-strainers.", description: "Durable Y-strainers and basket strainers for removing solids and protecting valves, meters, and pumps.", applications: ["Pump protection", "HVAC", "Process water"], specs: ["Iron and steel Y-strainers", "Stainless steel screens", "Flanged connections"], featured: true, type: "strainer", image: "/images/original/products/strainer.gif" },
  { slug: "other-valves", name: "Other Valves", short: "Cast steel, forged steel, ball, plug, and stainless valves.", description: "Dawei supplies cast steel, forged steel, stainless steel, ball, plug, globe, and specialty valve configurations.", applications: ["Industrial projects", "Process systems", "OEM supply"], specs: ["API, ANSI, DIN, BS, JIS", "Multiple materials", "Actuation options"], type: "other", image: "/images/original/products/other-valve.gif" },
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
