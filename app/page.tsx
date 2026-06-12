import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, CheckCircle2, Factory, Globe2, ShieldCheck } from "lucide-react";
import { products, industries } from "@/data/site";
import { ProductVisual } from "@/components/ProductVisual";
import { CTA } from "@/components/CTA";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return <>
    <section className="relative min-h-[620px] overflow-hidden bg-navy text-white">
      <Image src="/images/valve-hero.png" alt="Ductile iron valves in a waterworks facility" fill priority sizes="100vw" className="object-cover object-center opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/15" />
      <div className="grid-lines absolute inset-0" />
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20">
        <div className="max-w-4xl"><Badge variant="signal">Ductile Iron Valve Specialist</Badge>
          <h1 className="text-5xl font-black leading-[1.05] md:text-7xl">Metal Seated Gate Valves<br/><span className="text-blue-300"> & Double Eccentric Butterfly Valves</span></h1>
          <p className="mt-6 max-w-3xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/80 md:text-xl">Ductile iron valve solutions for waterworks, municipal infrastructure, and international project supply.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/products" className={buttonVariants({variant:"signal",size:"lg"})}>Explore Products</Link><Link href="/contact" className={buttonVariants({variant:"outline",size:"lg",className:"border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"})}>Request a Quote</Link></div>
        </div>
      </div>
    </section>
    <section className="border-b border-border bg-background"><div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">{[[BadgeCheck,"Ductile iron valve focus"],[Globe2,"International B2B supply"],[Boxes,"Waterworks project packages"],[ShieldCheck,"Quality-oriented sourcing"]].map(([Icon,label],i)=><div key={label as string} className={`flex items-center gap-3 border-border px-5 py-6 ${i<3?"md:border-r":""}`}><Icon className="text-primary"/><span className="text-sm font-bold text-navy">{label as string}</span></div>)}</div></section>
    <section className="px-5 py-20"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Primary product focus</p><h2 className="section-title">Two core ductile iron valve ranges<br/> for water infrastructure.</h2></div><Link href="/products" className="flex items-center gap-2 text-sm font-bold text-valve">View complete product range <ArrowRight size={16}/></Link></div>
      <div className="grid gap-6 md:grid-cols-2">{products.slice(0,2).map(p=><Card className="group overflow-hidden hover:border-primary hover:shadow-lg" key={p.slug}><Link href={`/products/${p.slug}`}><ProductVisual type={p.type} image={p.image} name={p.name} compact/><CardContent className="p-7"><Badge variant="signal">Core ductile iron product</Badge><h3 className="mt-4 text-2xl font-black text-navy group-hover:text-primary">{p.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{p.short}</p><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">View product series <ArrowRight size={14}/></span></CardContent></Link></Card>)}</div></div></section>
    <section className="bg-muted px-5 py-20"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">Established supply capability</p><h2 className="section-title">Ductile iron expertise backed by broader project supply.</h2><p className="mt-6 leading-8 text-muted-foreground">Established in the early 1990s, Dalian Dawei combines international supply experience with a focused product direction. Metal seated gate valves and flanged double eccentric butterfly valves lead our offering, while other valves and piping products remain available for complete project packages.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{["BS and DIN waterworks valve options","North America, Europe, Middle East and Asia","Flexible sourcing and consolidation","Export-ready coordination"].map(x=><div className="flex gap-2 text-sm font-bold text-navy" key={x}><CheckCircle2 size={18} className="shrink-0 text-signal"/>{x}</div>)}</div></div><div className="grid gap-4 sm:grid-cols-2"><div className="flex min-h-72 flex-col bg-navy p-7 text-white"><Factory size={34} className="text-signal"/><div className="mt-auto pt-12"><b className="block text-3xl">Ductile Iron Focus</b><p className="mt-2 text-sm leading-6 text-white/60">Metal seated gate valves and double eccentric butterfly valves for waterworks.</p></div></div><div className="flex min-h-72 flex-col bg-primary p-7 text-white"><Globe2 size={34} className="text-blue-200"/><div className="mt-auto pt-12"><b className="block text-3xl">Since the 1990s</b><p className="mt-2 text-sm leading-6 text-white/70">International supply experience across infrastructure and industrial projects.</p></div></div></div></div></section>
    <section className="px-5 py-20"><div className="mx-auto max-w-7xl"><div className="mb-10"><p className="eyebrow">Industries & applications</p><h2 className="section-title">Built around where valves work.</h2></div><div className="grid gap-px overflow-hidden border bg-border md:grid-cols-5">{industries.map(([name,desc],i)=><Card className="border-0 shadow-none" key={name}><CardContent className="p-6"><span className="text-4xl font-black text-border">0{i+1}</span><h3 className="mt-8 font-black text-navy">{name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></CardContent></Card>)}</div></div></section>
    <CTA />
  </>;
}
