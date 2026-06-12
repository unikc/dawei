import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, CheckCircle2, Factory, Globe2, ShieldCheck } from "lucide-react";
import { products, industries } from "@/data/site";
import { ProductVisual } from "@/components/ProductVisual";
import { CTA } from "@/components/CTA";

export default function Home() {
  return <>
    <section className="relative min-h-[620px] overflow-hidden bg-navy text-white">
      <Image src="/images/valve-hero.png" alt="Ductile iron valves in a waterworks facility" fill priority sizes="100vw" className="object-cover object-center opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/15" />
      <div className="grid-lines absolute inset-0" />
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20">
        <div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em]"><span className="h-2 w-2 bg-signal"/>Valve & Piping Supply</div>
          <h1 className="text-5xl font-black leading-[1.05] md:text-7xl">Industrial Valve<br/><span className="text-blue-300"> Solutions</span></h1>
          <p className="mt-6 max-w-2xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/80 md:text-xl">Specialized in Ductile Iron Valves for Waterworks and Infrastructure Projects</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/products" className="bg-signal px-7 py-4 text-sm font-bold uppercase tracking-wider">Explore Products</Link><Link href="/contact" className="border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wider">Request a Quote</Link></div>
        </div>
      </div>
    </section>
    <section className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">{[[BadgeCheck,"Valve-focused expertise"],[Globe2,"International B2B supply"],[Boxes,"Consolidated project packages"],[ShieldCheck,"Quality-oriented sourcing"]].map(([Icon,label],i)=><div key={label as string} className={`flex items-center gap-3 border-slate-200 px-5 py-6 ${i<3?"md:border-r":""}`}><Icon className="text-valve"/><span className="text-sm font-bold text-navy">{label as string}</span></div>)}</div></section>
    <section className="px-5 py-20"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Core product range</p><h2 className="section-title">Ductile iron valves at the center<br/>of every project package.</h2></div><Link href="/products" className="flex items-center gap-2 text-sm font-bold text-valve">View all products <ArrowRight size={16}/></Link></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0,5).map((p,i)=><Link href={`/products/${p.slug}`} key={p.slug} className={`group overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-valve hover:shadow-xl ${i===0?"lg:col-span-2":""}`}><ProductVisual type={p.type} image={p.image} name={p.name} compact/><div className="p-6"><span className="text-[10px] font-bold uppercase tracking-widest text-signal">Ductile iron series</span><h3 className="mt-2 text-xl font-black text-navy group-hover:text-valve">{p.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{p.short}</p><span className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-valve">View range <ArrowRight size={14}/></span></div></Link>)}</div></div></section>
    <section className="bg-mist px-5 py-20"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">Established supply capability</p><h2 className="section-title">Decades of valve and piping experience, with a clear valve focus.</h2><p className="mt-6 leading-8 text-slate-600">Established in the early 1990s, Dalian Dawei has developed broad industrial product knowledge and international supply experience. Today, we lead with ductile iron valves while supporting complete valve and piping packages.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{["API, ANSI, AWWA, DIN and BS supply","North America, Europe, Middle East and Asia","Flexible sourcing and consolidation","Export-ready coordination"].map(x=><div className="flex gap-2 text-sm font-bold text-navy" key={x}><CheckCircle2 size={18} className="shrink-0 text-signal"/>{x}</div>)}</div></div><div className="grid grid-cols-2 gap-4"><div className="bg-navy p-7 text-white"><Factory size={34} className="text-signal"/><b className="mt-12 block text-3xl">Broad Range</b><p className="mt-2 text-sm leading-6 text-white/60">Valves, fittings, flanges, pipes, and project supply.</p></div><div className="mt-10 bg-valve p-7 text-white"><Globe2 size={34} className="text-blue-200"/><b className="mt-12 block text-3xl">Since 1990s</b><p className="mt-2 text-sm leading-6 text-white/70">International industrial supply experience.</p></div></div></div></section>
    <section className="px-5 py-20"><div className="mx-auto max-w-7xl"><div className="mb-10"><p className="eyebrow">Industries & applications</p><h2 className="section-title">Built around where valves work.</h2></div><div className="grid gap-px overflow-hidden border bg-slate-200 md:grid-cols-5">{industries.map(([name,desc],i)=><div className="bg-white p-6" key={name}><span className="text-4xl font-black text-slate-200">0{i+1}</span><h3 className="mt-8 font-black text-navy">{name}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{desc}</p></div>)}</div></div></section>
    <CTA />
  </>;
}
