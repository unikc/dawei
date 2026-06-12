import catalog from "@/data/legacy-catalog.json";
import Image from "next/image";
import Link from "next/link";
import { FileText, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { ProductSpecifications } from "@/components/ProductSpecifications";
import { DoubleEccentricTechnicalData } from "@/components/DoubleEccentricTechnicalData";

export function generateStaticParams(){return catalog.map((p)=>({slug:p.slug}))}

export default function ProductDetailPage({params}:{params:{slug:string}}){
  const product=catalog.find((p)=>p.slug===params.slug); if(!product)notFound();
  const rows=product.tableRows;
  return <><section className="bg-mist px-5 py-14"><div className="mx-auto max-w-7xl"><Link href="/products" className="text-xs font-bold uppercase tracking-wider text-valve">← All products</Link><div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">{product.category}</p><h1 className="text-4xl font-black text-navy md:text-5xl">{product.title}</h1><p className="mt-5 text-sm leading-7 text-slate-600">{product.summary || "Contact Dawei for product specifications and availability."}</p><Link href="/contact" className="mt-7 inline-block bg-signal px-7 py-4 text-sm font-bold uppercase tracking-wider text-white">Request a Quote</Link></div><div className="grid grid-cols-2 gap-3">{product.images.slice(0,4).map((src,i)=><div className={`relative bg-white ${i===0?"col-span-2 h-72":"h-44"}`} key={src}><Image src={src} alt={`${product.title} image ${i+1}`} fill unoptimized className="object-contain p-5"/></div>)}{!product.images.length&&<div className="col-span-2 grid h-72 place-items-center bg-white text-slate-400"><FileText size={48}/></div>}</div></div></div></section>
  <section className="px-5 py-14"><div className="mx-auto max-w-7xl"><h2 className="mb-8 text-2xl font-black text-navy">Product Specifications</h2>{rows.length?<ProductSpecifications rows={rows}/>:<p className="bg-mist p-5 text-sm text-slate-500">Detailed specifications are available based on your project requirements.</p>}<div className="mt-8 flex gap-3 border-l-4 border-valve bg-blue-50 p-5 text-sm leading-6 text-slate-600"><Info className="shrink-0 text-valve"/><p>Product specifications, materials, standards, and availability may vary by project. Please include your required size, pressure rating, material, standard, and quantity in the RFQ.</p></div></div></section>{/^valves-butterfly-0[1-3]$/.test(product.slug)&&<DoubleEccentricTechnicalData/>}<CTA/></>;
}
