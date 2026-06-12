import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, Mail, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export const metadata = { title: "Design System v1.0" };

const colors = [
  ["Navy", "bg-navy", "Authority, navigation, technical headers"],
  ["Valve Blue", "bg-primary", "Primary actions, links, selected states"],
  ["Signal Orange", "bg-signal", "RFQ conversion and high-priority emphasis"],
  ["Steel", "bg-steel", "Supporting industrial surfaces"],
  ["Mist", "bg-muted", "Quiet sections, alternating rows, supporting content"],
  ["White", "bg-background border", "Primary reading and product surfaces"],
];

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="border-b border-border px-5 py-16"><div className="mx-auto max-w-7xl"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2><div className="mt-8">{children}</div></div></section>;
}

export default function DesignSystemPage() {
  return <div>
    <section className="bg-navy px-5 py-20 text-white"><div className="mx-auto max-w-7xl"><Badge variant="signal">Version 1.0</Badge><h1 className="mt-6 max-w-4xl text-5xl font-black md:text-6xl">Dawei Industrial Design System</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">An open-code component system for product-forward international B2B valve experiences. Practical, technical, credible, and built for RFQ conversion.</p></div></section>

    <Section eyebrow="Foundation" title="Design principles">
      <div className="grid gap-5 md:grid-cols-4">{[
        ["Product First", "Technical products and specifications lead every important page."],
        ["Industrial Clarity", "Strong hierarchy, visible borders, and restrained decoration."],
        ["Buyer Confidence", "Standards, materials, applications, and RFQ paths remain explicit."],
        ["Open Code", "Components live in the repository and can be adapted without wrappers."],
      ].map(([title, description],i)=><Card key={title}><CardHeader className="border-b-0"><span className="text-3xl font-black text-border">0{i+1}</span><CardTitle className="mt-5">{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader></Card>)}</div>
    </Section>

    <Section eyebrow="Tokens" title="Industrial color system">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{colors.map(([name,color,use])=><Card key={name}><div className={`h-24 ${color}`}/><CardContent><CardTitle>{name}</CardTitle><CardDescription>{use}</CardDescription></CardContent></Card>)}</div>
    </Section>

    <Section eyebrow="Typography" title="Clear hierarchy for technical buyers">
      <Card><CardContent className="space-y-7"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-primary">Eyebrow / Product context</p><p className="mt-2 text-xs text-muted-foreground">12px · Bold · Uppercase · Wide tracking</p></div><div><p className="text-5xl font-black leading-tight text-navy">Metal Seated Gate Valves</p><p className="mt-2 text-xs text-muted-foreground">Display · Black · High-impact product positioning</p></div><div><p className="text-3xl font-black text-navy">Technical Specifications</p><p className="mt-2 text-xs text-muted-foreground">Section heading · Black · Short and descriptive</p></div><div><p className="max-w-3xl leading-8 text-muted-foreground">Dawei provides ductile iron valve solutions for waterworks, municipal infrastructure, and international project supply.</p><p className="mt-2 text-xs text-muted-foreground">Body · Comfortable line-height · Muted foreground</p></div></CardContent></Card>
    </Section>

    <Section eyebrow="Actions" title="Buttons and badges">
      <Card><CardContent><div className="flex flex-wrap items-center gap-3"><Button>Primary action</Button><Button variant="signal">Request a Quote</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Text link</Button></div><div className="mt-8 flex flex-wrap gap-3"><Badge>Core Product</Badge><Badge variant="signal">RFQ Priority</Badge><Badge variant="secondary">PN10 / PN16</Badge><Badge variant="outline">DN150-DN2000</Badge></div></CardContent></Card>
    </Section>

    <Section eyebrow="Surfaces" title="Cards and buyer pathways">
      <div className="grid gap-6 md:grid-cols-3"><Card><CardHeader><Badge className="w-fit" variant="signal">Primary focus</Badge><CardTitle className="mt-4">Flanged Double Eccentric Butterfly Valves</CardTitle><CardDescription>Ductile iron valve solutions for waterworks and infrastructure.</CardDescription></CardHeader><CardContent><p className="flex gap-2 text-sm font-bold text-foreground"><CheckCircle2 size={18} className="text-primary"/>PN10 / PN16 / PN25</p></CardContent><CardFooter><Link href="/products/ductile-iron-butterfly-valves" className={buttonVariants({ variant:"outline", size:"sm" })}>View range <ArrowRight size={14}/></Link></CardFooter></Card><Card><CardHeader><CardTitle>Technical Data</CardTitle><CardDescription>Use structured tables and explicit qualification notes.</CardDescription></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">Standards, dimensions, materials, torque, and weight should be readable before the buyer sends an inquiry.</p></CardContent></Card><Card className="bg-navy text-white"><CardHeader><CardTitle className="text-white">Start an RFQ</CardTitle><CardDescription className="text-white/60">High-value conversion uses Signal Orange.</CardDescription></CardHeader><CardFooter><Link href="/contact" className={buttonVariants({ variant:"signal" })}><Mail size={16}/> Request a Quote</Link></CardFooter></Card></div>
    </Section>

    <Section eyebrow="Feedback" title="Alerts and qualification notes">
      <div className="grid gap-5 md:grid-cols-3"><Alert><Info className="mb-3 text-primary"/><AlertTitle>Technical Information</AlertTitle><AlertDescription>Use blue for general product and engineering guidance.</AlertDescription></Alert><Alert variant="warning"><TriangleAlert className="mb-3 text-signal"/><AlertTitle>Confirm Before Order</AlertTitle><AlertDescription>Use orange for specification, availability, and approval notes.</AlertDescription></Alert><Alert variant="neutral"><AlertTitle>Archive Content</AlertTitle><AlertDescription>Use neutral treatment for historical or supporting information.</AlertDescription></Alert></div>
    </Section>

    <Section eyebrow="Forms" title="RFQ input patterns">
      <Card className="max-w-3xl"><CardContent className="grid gap-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-foreground">Name<Input className="mt-2" placeholder="Your name"/></label><label className="text-sm font-bold text-foreground">Company<Input className="mt-2" placeholder="Company name"/></label></div><label className="text-sm font-bold text-foreground">Product requirements<Textarea className="mt-2" placeholder="Valve type, size, pressure rating, standard, quantity..."/></label><Button variant="signal" className="w-fit"><Mail size={16}/> Submit RFQ</Button></CardContent></Card>
    </Section>

    <Section eyebrow="Data" title="Technical table patterns">
      <Table><TableHeader><TableRow><TableHead>Size</TableHead><TableHead>Pressure</TableHead><TableHead>Body</TableHead><TableHead>Standard</TableHead><TableHead>Application</TableHead></TableRow></TableHeader><TableBody>{[["DN150-DN2000","PN10 / PN16 / PN25","Ductile iron","EN 593","Waterworks"],["DN350-DN1200","PN10 / PN16","Ductile iron","BS 5163 / DIN F4-F5","Municipal infrastructure"]].map(row=><TableRow key={row[0]}>{row.map(cell=><TableCell key={cell}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table>
    </Section>
  </div>;
}
