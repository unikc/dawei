"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

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
  }), [products, query, category]);

  return <div>
    <div className="mb-8 border bg-mist p-5">
      <label className="flex items-center gap-3 bg-white px-4 py-3"><Search size={18} className="text-valve"/><input value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full outline-none" placeholder="Search product, standard, material, pressure class..."/></label>
      <div className="mt-4 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-4 py-2 text-xs font-bold ${category===c?"bg-valve text-white":"border bg-white text-navy"}`}>{c}</button>)}</div>
    </div>
    <p className="mb-5 text-sm text-slate-500"><b className="text-navy">{filtered.length}</b> products match your selection</p>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(p=><Link href={`/products/detail/${p.slug}`} key={p.slug} className="group overflow-hidden border bg-white hover:border-valve hover:shadow-lg">
      <div className="relative h-48 bg-gradient-to-br from-white to-slate-100">{p.images[0]?<Image src={p.images[0]} alt={p.title} fill unoptimized className="object-contain p-6"/>:<div className="grid h-full place-items-center text-xs font-bold uppercase tracking-widest text-slate-400">Product information</div>}</div>
      <div className="p-5"><span className="text-[10px] font-bold uppercase tracking-widest text-signal">{p.category}</span><h2 className="mt-2 text-lg font-black text-navy group-hover:text-valve">{p.title}</h2><p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-500">{p.summary || "Contact Dawei for product specifications and availability."}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-valve">View specifications →</p></div>
    </Link>)}</div>
  </div>;
}
