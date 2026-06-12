"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = useMemo(() => products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const haystack = `${p.title} ${p.summary}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }).toSorted((a,b) => {
    const priority = (slug:string) => /valves-(dincast-\d+|gatens-(01|02)|butterfly-(01|02|03))$/.test(slug) ? 0 : 1;
    return priority(a.slug)-priority(b.slug) || a.title.localeCompare(b.title);
  }), [products, query, category]);

  return <div>
    <Card className="mb-8 bg-muted"><CardContent className="p-5">
      <label className="flex items-center gap-3"><Search size={18} className="text-primary"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search product, standard, material, pressure class..."/></label>
      <div className="mt-4 flex flex-wrap gap-2">{categories.map(c=><Button size="sm" variant={category===c?"primary":"outline"} key={c} onClick={()=>setCategory(c)}>{c}</Button>)}</div>
    </CardContent></Card>
    <p className="mb-5 text-sm text-muted-foreground"><b className="text-navy">{filtered.length}</b> products match your selection</p>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(p=><Card key={p.slug} className="group overflow-hidden hover:border-primary hover:shadow-lg"><Link href={`/products/detail/${p.slug}`}>
      <div className="relative h-48 bg-gradient-to-br from-white to-muted">{p.images[0]?<Image src={p.images[0]} alt={p.title} fill unoptimized className="object-contain p-6"/>:<div className="grid h-full place-items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Product information</div>}</div>
      <CardContent className="p-5"><Badge variant="signal">{p.category}</Badge><h2 className="mt-3 text-lg font-black text-navy group-hover:text-primary">{p.title}</h2><p className="mt-3 line-clamp-3 text-xs leading-5 text-muted-foreground">{p.summary || "Contact Dawei for product specifications and availability."}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-primary">View specifications →</p></CardContent>
    </Link></Card>)}</div>
  </div>;
}
