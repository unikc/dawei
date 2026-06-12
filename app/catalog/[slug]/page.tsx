import catalog from "@/data/legacy-catalog.json";
import { redirect } from "next/navigation";

export function generateStaticParams(){return catalog.map((p)=>({slug:p.slug}))}

export default function CatalogProductPage({params}:{params:{slug:string}}){
  redirect(`/products/detail/${params.slug}`);
}
