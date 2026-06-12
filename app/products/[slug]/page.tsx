import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { products } from "@/data/site";
import { ProductVisual } from "@/components/ProductVisual";
import { CTA } from "@/components/CTA";
import catalog from "@/data/legacy-catalog.json";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export default function ProductPage({params}:{params:{slug:string}}){const p=products.find(x=>x.slug===params.slug);if(!p)notFound();const matchers:Record<string,(slug:string)=>boolean>= {
  "ductile-iron-gate-valves":slug=>/valves-(dincast-\d+|gatens-(01|02))$/.test(slug),
  "ductile-iron-butterfly-valves":slug=>/valves-butterfly-(01|02|03)$/.test(slug),
  "ductile-iron-check-valves":slug=>/valves-(gatens-03|butterfly-wc)$/.test(slug),
  "strainers":slug=>/strainer|-ys$/.test(slug),
  "other-valves":slug=>slug.startsWith("valves-")&&!/valves-(dincast|gatens|castiron-rsg|butterfly-(01|02|03|wt|wt1|wc))/.test(slug),
  "fittings":slug=>slug.startsWith("fittings-"),
  "pipes":slug=>slug.startsWith("pipes-"),
  "flanges":slug=>slug.startsWith("flanges-"),
};const related=catalog.filter(x=>matchers[p.slug]?.(x.slug)).slice(0,12);return <><section className="bg-muted px-5 py-16"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><div><Badge>Dawei product range</Badge><h1 className="mt-5 text-4xl font-black text-navy md:text-5xl">{p.name}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{p.description}</p><Link href="/contact" className={buttonVariants({variant:"signal",size:"lg",className:"mt-8"})}>Request a Quote</Link></div><ProductVisual type={p.type} image={p.image} name={p.name}/></div></section><section className="px-5 py-16"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2"><Card><CardContent className="p-7"><h2 className="text-2xl font-black text-navy">Typical Specifications</h2><div className="mt-6 space-y-3">{p.specs.map(x=><p className="flex gap-3 border-b pb-3 text-sm last:border-b-0" key={x}><CheckCircle2 size={18} className="text-primary"/>{x}</p>)}</div></CardContent></Card><Card><CardContent className="p-7"><h2 className="text-2xl font-black text-navy">Applications</h2><div className="mt-6 space-y-3">{p.applications.map(x=><p className="flex gap-3 border-b pb-3 text-sm last:border-b-0" key={x}><CheckCircle2 size={18} className="text-signal"/>{x}</p>)}</div></CardContent></Card></div></section>{related.length>0&&<section className="bg-muted px-5 py-16"><div className="mx-auto max-w-7xl"><p className="eyebrow">Available product series</p><h2 className="section-title">Explore {p.name}</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map(x=><Card key={x.slug} className="group overflow-hidden hover:border-primary hover:shadow-lg"><Link href={`/products/detail/${x.slug}`}><div className="relative h-44">{x.images[0]?<Image src={x.images[0]} alt={x.title} fill unoptimized className="object-contain p-5"/>:<div className="grid h-full place-items-center text-xs text-muted-foreground">Product information</div>}</div><CardContent className="p-5"><h3 className="font-black text-navy group-hover:text-primary">{x.title}</h3><p className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">View specifications →</p></CardContent></Link></Card>)}</div></div></section>}<CTA/></>}
