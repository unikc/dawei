"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CatalogProduct = {
  slug: string;
  category: string;
  title: string;
  images: string[];
  summary: string;
  sourceFiles: string[];
};

export function CatalogExplorer({ products }: { products: CatalogProduct[] }) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState("All");
  useEffect(() => { setQuery(urlQuery); }, [urlQuery]);
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const filtered = useMemo(() => products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const haystack = normalize(`${p.title} ${p.summary}`);
    return matchesCategory && haystack.includes(normalize(query));
  }).toSorted((a,b) => {
    const priority = (slug:string) => {
      const itemNumber = Number(slug.match(/sino-(?:1-1-2|1-4|1-6|1-2)-(\d+)/)?.[1] ?? 0);
      if (slug.startsWith("sino-1-1-2-")) return itemNumber / 100;
      if (slug.startsWith("sino-1-4-")) return 1 + itemNumber / 100;
      if (slug.startsWith("sino-1-6-")) return 2 + itemNumber / 100;
      if (slug.startsWith("sino-1-2-")) return 3 + itemNumber / 100;
      return 4;
    };
    return priority(a.slug)-priority(b.slug) || a.title.localeCompare(b.title);
  }), [products, query, category]);

  return <div>
    <Card className="mb-5 bg-muted"><CardContent className="p-4">
      <label className="flex items-center gap-3"><Search size={18} className="text-primary"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search product, standard, material, pressure class..."/></label>
      <div className="mt-3 flex flex-wrap gap-2">{categories.map(c=><Button size="sm" variant={category===c?"primary":"outline"} key={c} onClick={()=>setCategory(c)}>{c}</Button>)}</div>
    </CardContent></Card>
    <p className="mb-4 text-sm text-muted-foreground"><b className="text-navy">{filtered.length}</b> products match your selection</p>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(p=><Card key={p.slug} className="group overflow-hidden hover:border-primary hover:shadow-lg"><Link href={`/products/detail/${p.slug}`}>
      <div className="relative h-36 bg-gradient-to-br from-white to-muted">{p.images[0]?<Image src={p.images[0]} alt={p.title} fill unoptimized className="object-contain p-4"/>:<div className="grid h-full place-items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Product information</div>}</div>
      <CardContent className="p-4"><h2 className="text-base font-black leading-5 text-navy group-hover:text-primary">{p.title}</h2><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{p.summary || "Contact Dawei for product specifications and availability."}</p><p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-primary">View specifications →</p></CardContent>
    </Link></Card>)}</div>
  </div>;
}
