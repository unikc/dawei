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
  { slug: "ductile-iron-gate-valves", name: "Metal Seated Gate Valves", short: "Metal seated gate valves in EN, BS, and Class 125 configurations.", description: "Metal seated gate valve series with rising and non-rising stem configurations, covering DN40-DN1200 and Class 125 sizes from 2 to 24 inches.", applications: ["Waterworks", "Municipal infrastructure", "Transmission pipelines"], specs: ["DN40-DN1200", "PN10 / PN16", "Class 125 options"], featured: true, type: "gate", image: "/images/sino/MPN-1.jpg" },
  { slug: "ductile-iron-check-valves", name: "Ductile Iron Check Valves", short: "Flanged, tilting disc, and dual plate check valves.", description: "Check valve series including flanged swing, flanged lift, tilting disc, and dual plate wafer type configurations.", applications: ["Pump stations", "Water networks", "Industrial projects"], specs: ["DN15-DN1400", "PN10 / PN16 / PN25", "Class 125 options"], featured: true, type: "check", image: "/images/sino/xz-22.png" },
  { slug: "air-valves", name: "Air Valves", short: "Single and double orifice air release valves.", description: "Air release valve and double orifice air release valve series in ductile iron for water service.", applications: ["Transmission mains", "Irrigation", "Wastewater"], specs: ["DN40-DN300", "PN16", "Ductile iron body"], featured: true, type: "air", image: "/images/sino/APN-1.jpg" },
  { slug: "ductile-iron-butterfly-valves", name: "Butterfly Valves", short: "Flanged, U section, wafer, and lug type butterfly valves.", description: "Butterfly valve series including flanged double eccentric, concentric disc, U section, wafer, and lug type configurations.", applications: ["Water service"], specs: ["DN40-DN2000", "PN10 / PN16 / PN25", "Class 125 / 150 options"], featured: true, type: "butterfly", image: "/images/sino/xz-19.png" },
  { slug: "strainers", name: "Strainers", short: "Cast iron and steel Y-strainers.", description: "Durable Y-strainers and basket strainers for removing solids and protecting valves, meters, and pumps.", applications: ["Pump protection", "HVAC", "Process water"], specs: ["Iron and steel Y-strainers", "Stainless steel screens", "Flanged connections"], featured: true, type: "strainer", image: "/legacy/products/valves/images/valves_castiron_14a.gif" },
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
