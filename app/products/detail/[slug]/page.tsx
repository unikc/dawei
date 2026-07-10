import catalog from "@/data/legacy-catalog.json";
import Link from "next/link";
import { FileText, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductImageLightbox } from "@/components/ProductImageLightbox";
import { ProductSpecifications } from "@/components/ProductSpecifications";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { ProductDetailNav } from "@/components/ProductDetailNav";
import { getSinoPriorityProduct, sinoPriorityProducts } from "@/data/sino-priority";
import { SinoProductDetails } from "@/components/SinoProductDetails";

export function generateStaticParams(){return [...sinoPriorityProducts,...catalog].map((p)=>({slug:p.slug}))}

export function generateMetadata({params}:{params:{slug:string}}){
  const p=getSinoPriorityProduct(params.slug)??catalog.find((x)=>x.slug===params.slug);
  if(!p)return{};
  const range="range" in p&&p.range?` (${p.range})`:"";
  const summary=("summary" in p&&p.summary?p.summary:`${p.title} supplied by Dalian Dawei for international waterworks and infrastructure projects.`).replace(/\s+/g," ").trim();
  const description=summary.length>155?summary.slice(0,152).trimEnd()+"...":summary;
  return{title:`${p.title}${range}`,description};
}

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
  const priorityProduct=getSinoPriorityProduct(params.slug);
  if(priorityProduct){
    const supportingLegacyProducts=catalog.filter((item)=>!["Gate Valves","Butterfly Valves","Check Valves"].includes(productNavigationCategory(item)));
    const navigationProducts=[
      ...sinoPriorityProducts.map((item)=>({slug:item.slug,category:item.navigationCategory,title:`${item.title} · ${item.range}`})),
      ...supportingLegacyProducts.map((item)=>({slug:item.slug,category:productNavigationCategory(item),title:item.title})),
    ];
    return <div className="mx-auto grid max-w-[1480px] gap-5 px-4 py-5 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-start">
      <ProductDetailNav products={navigationProducts} currentSlug={priorityProduct.slug}/>
      <main className="min-w-0 overflow-hidden border border-border bg-background">
        <section className="bg-muted px-5 py-6 md:px-8">
          <Link href={`/products/${priorityProduct.categorySlug}`} className="text-xs font-bold uppercase tracking-wider text-primary">← {priorityProduct.categoryName}</Link>
          <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_.8fr] xl:items-center">
            <div><h1 className="text-3xl font-black leading-tight text-navy md:text-4xl">{priorityProduct.title}</h1><p className="mt-3 text-base font-bold text-primary">{priorityProduct.range}</p></div>
            <div className="grid grid-cols-2 gap-2">{priorityProduct.images.slice(0,4).map((src,i)=><ProductImageLightbox src={src} alt={`${priorityProduct.title} image ${i+1}`} featured={i===0} key={src}/>)}</div>
          </div>
        </section>
        <SinoProductDetails html={priorityProduct.detailHtml}/>
      </main>
    </div>;
  }
  const product=catalog.find((p)=>p.slug===params.slug); if(!product)notFound();
  const rows=product.tableRows;
  const title=product.title;
  const summary=product.summary || "Contact Dawei for product specifications and availability.";
  const supportingLegacyProducts=catalog.filter((item)=>!["Gate Valves","Butterfly Valves","Check Valves"].includes(productNavigationCategory(item)));
  return <><div className="mx-auto grid max-w-[1480px] gap-5 px-4 py-5 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-start">
    <ProductDetailNav products={[...sinoPriorityProducts.map((item)=>({slug:item.slug,category:item.navigationCategory,title:`${item.title} · ${item.range}`})),...supportingLegacyProducts.map((item)=>({slug:item.slug,category:productNavigationCategory(item),title:item.title}))]} currentSlug={product.slug}/>
    <main className="min-w-0 overflow-hidden border border-border bg-background">
      <section className="bg-muted px-5 py-8 md:px-8"><Link href="/products" className="text-xs font-bold uppercase tracking-wider text-primary">← All products</Link><div className="mt-5 grid gap-6 xl:grid-cols-2 xl:items-center"><div><h1 className="text-3xl font-black leading-tight text-navy md:text-4xl">{title}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{summary}</p></div><div className="grid grid-cols-2 gap-2">{product.images.slice(0,4).map((src,i)=><ProductImageLightbox src={src} alt={`${title} image ${i+1}`} featured={i===0} key={src}/>)}{!product.images.length&&<Card className="col-span-2 grid h-56 place-items-center text-muted-foreground"><FileText size={42}/></Card>}</div></div></section>
      <section className="px-5 py-8 md:px-8"><h2 className="mb-5 text-xl font-black text-navy">Product Specifications</h2>{rows.length?<ProductSpecifications rows={rows}/>:<Alert variant="neutral"><AlertDescription>Detailed specifications are available based on your project requirements.</AlertDescription></Alert>}<Alert className="mt-5"><Info className="mb-2 text-primary"/><AlertTitle>Confirm Project Requirements</AlertTitle><AlertDescription>Product specifications, materials, standards, and availability may vary by project. Please include your required size, pressure rating, material, standard, and quantity in the RFQ.</AlertDescription></Alert></section>
    </main>
  </div></>;
}
