import catalog from "@/data/legacy-catalog.json";
import Image from "next/image";
import Link from "next/link";
import { FileText, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { ProductSpecifications } from "@/components/ProductSpecifications";
import { DoubleEccentricTechnicalData } from "@/components/DoubleEccentricTechnicalData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductDetailNav } from "@/components/ProductDetailNav";

export function generateStaticParams(){return catalog.map((p)=>({slug:p.slug}))}

function productNavigationCategory(product: (typeof catalog)[number]) {
  if (product.category !== "Valves") return product.category;
  if (/butterfly/i.test(product.title)) return "Butterfly Valves";
  if (/gate/i.test(product.title)) return "Gate Valves";
  if (/check/i.test(product.title)) return "Check Valves";
  if (/globe/i.test(product.title)) return "Globe Valves";
  if (/ball/i.test(product.title)) return "Ball Valves";
  if (/plug/i.test(product.title)) return "Plug Valves";
  if (/strainer/i.test(product.title)) return "Strainers";
  return "Other Valves";
}

export default function ProductDetailPage({params}:{params:{slug:string}}){
  const product=catalog.find((p)=>p.slug===params.slug); if(!product)notFound();
  const rows=product.tableRows;
  return <><div className="mx-auto grid max-w-[1480px] gap-8 px-5 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
    <ProductDetailNav products={catalog.map((item)=>({slug:item.slug,category:productNavigationCategory(item),title:item.title}))} currentSlug={product.slug}/>
    <main className="min-w-0 overflow-hidden border border-border bg-background">
      <section className="bg-muted px-5 py-14 md:px-10"><Link href="/products" className="text-xs font-bold uppercase tracking-wider text-primary">← All products</Link><div className="mt-8 grid gap-10 xl:grid-cols-2 xl:items-center"><div><Badge>{product.category}</Badge><h1 className="mt-5 text-4xl font-black text-navy md:text-5xl">{product.title}</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">{product.summary || "Contact Dawei for product specifications and availability."}</p><Link href="/contact" className={buttonVariants({variant:"signal",size:"lg",className:"mt-7"})}>Request a Quote</Link></div><div className="grid grid-cols-2 gap-3">{product.images.slice(0,4).map((src,i)=><Card className={`relative bg-background ${i===0?"col-span-2 h-72":"h-44"}`} key={src}><Image src={src} alt={`${product.title} image ${i+1}`} fill unoptimized className="object-contain p-5"/></Card>)}{!product.images.length&&<Card className="col-span-2 grid h-72 place-items-center text-muted-foreground"><FileText size={48}/></Card>}</div></div></section>
      <section className="px-5 py-14 md:px-10"><h2 className="mb-8 text-2xl font-black text-navy">Product Specifications</h2>{rows.length?<ProductSpecifications rows={rows}/>:<Alert variant="neutral"><AlertDescription>Detailed specifications are available based on your project requirements.</AlertDescription></Alert>}<Alert className="mt-8"><Info className="mb-3 text-primary"/><AlertTitle>Confirm Project Requirements</AlertTitle><AlertDescription>Product specifications, materials, standards, and availability may vary by project. Please include your required size, pressure rating, material, standard, and quantity in the RFQ.</AlertDescription></Alert></section>
      {/^valves-butterfly-0[1-3]$/.test(product.slug)&&<DoubleEccentricTechnicalData/>}
    </main>
  </div><CTA/></>;
}
