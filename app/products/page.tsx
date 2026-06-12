import catalog from "@/data/legacy-catalog.json";
import { CatalogExplorer } from "@/components/CatalogExplorer";

export const metadata = { title: "Products" };

export default function Products(){
  return <>
    <section className="border-b border-border bg-muted px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-black text-navy md:text-4xl">Products</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Search the complete Dawei product range by product type, material, standard, or pressure class.</p>
      </div>
    </section>
    <section className="px-5 py-8">
      <div className="mx-auto max-w-7xl"><CatalogExplorer products={catalog}/></div>
    </section>
  </>;
}
