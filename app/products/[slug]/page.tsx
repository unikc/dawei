import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { products } from "@/data/site";
import { ProductVisual } from "@/components/ProductVisual";
import catalog from "@/data/legacy-catalog.json";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getSinoPriorityCategoryProducts } from "@/data/sino-priority";
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}

export function generateMetadata({params}:{params:{slug:string}}){
  const p=products.find(x=>x.slug===params.slug);
  if(!p)return{};
  return{title:p.name,description:p.description};
}

export default function ProductPage({params}:{params:{slug:string}}) {
  const p=products.find(x=>x.slug===params.slug);
  if(!p)notFound();
  const matchers:Record<string,(slug:string)=>boolean>= {
    "ductile-iron-gate-valves":slug=>/valves-(dincast-\d+|gatens-(01|02))$/.test(slug),
    "ductile-iron-butterfly-valves":slug=>slug==="valves-butterfly-01",
    "ductile-iron-check-valves":slug=>/valves-(gatens-03|butterfly-wc)$/.test(slug),
    "strainers":slug=>/strainer|-ys$/.test(slug),
    "other-valves":slug=>slug.startsWith("valves-")&&!/valves-(dincast|gatens|castiron-rsg|butterfly-(01|02|03|wt|wt1|wc))/.test(slug),
    "fittings":slug=>slug.startsWith("fittings-"),
    "pipes":slug=>slug.startsWith("pipes-"),
    "flanges":slug=>slug.startsWith("flanges-"),
  };
  const priorityProducts=getSinoPriorityCategoryProducts(p.slug);
  const related=priorityProducts.length ? priorityProducts : catalog.filter(x=>matchers[p.slug]?.(x.slug)).slice(0,12);
  const isPriorityCategory=priorityProducts.length>0;

  return <>
    <section className="bg-muted px-5 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div><nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Link className="text-primary hover:text-navy" href="/products">Products</Link><ChevronRight size={14}/><span>{p.name}</span></nav><h1 className="text-3xl font-black text-navy md:text-4xl">{p.name}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{p.description}</p></div>
        <ProductVisual type={p.type} image={priorityProducts[0]?.image ?? p.image} name={p.name} compact label={false}/>
      </div>
    </section>

    {related.length>0&&<section className="px-5 py-10">
      <div className="mx-auto max-w-7xl"><p className="eyebrow">Available product series</p><h2 className="text-2xl font-black text-navy md:text-3xl">Explore {p.name}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(x=><Card key={x.slug} className="group overflow-hidden hover:border-primary hover:shadow-lg"><Link href={`/products/detail/${x.slug}`}><div className="relative h-36">{x.images[0]?<Image src={x.images[0]} alt={x.title} fill unoptimized className="object-contain p-4"/>:<div className="grid h-full place-items-center text-xs text-muted-foreground">Product information</div>}</div><CardContent className="p-4"><h3 className="text-sm font-black leading-5 text-navy group-hover:text-primary">{x.title}</h3>{"range" in x&&<p className="mt-1 text-xs text-muted-foreground">{x.range}</p>}<p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-primary">View specifications →</p></CardContent></Link></Card>)}</div></div>
    </section>}

    {!isPriorityCategory&&<section className="bg-muted px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        <Card><CardContent className="p-5"><h2 className="text-xl font-black text-navy">Typical Specifications</h2><div className="mt-4 space-y-2">{p.specs.map(x=><p className="flex gap-3 border-b pb-2 text-sm last:border-b-0" key={x}><CheckCircle2 size={17} className="text-primary"/>{x}</p>)}</div></CardContent></Card>
        <Card><CardContent className="p-5"><h2 className="text-xl font-black text-navy">Applications</h2><div className="mt-4 space-y-2">{p.applications.map(x=><p className="flex gap-3 border-b pb-2 text-sm last:border-b-0" key={x}><CheckCircle2 size={17} className="text-signal"/>{x}</p>)}</div></CardContent></Card>
      </div>
    </section>}
  </>;
}
