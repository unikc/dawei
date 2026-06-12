"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProductNavItem = {
  slug: string;
  category: string;
  title: string;
};

export function ProductDetailNav({ products, currentSlug }: { products: ProductNavItem[]; currentSlug: string }) {
  const currentIndex = products.findIndex((product) => product.slug === currentSlug);
  const current = products[currentIndex];
  const previous = currentIndex > 0 ? products[currentIndex - 1] : null;
  const next = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;
  const groups = products.reduce<Record<string, ProductNavItem[]>>((result, product) => {
    (result[product.category] ??= []).push(product);
    return result;
  }, {});

  const navigation = <div className="divide-y divide-border border-t border-border">
    {Object.entries(groups).map(([category, items]) => {
      const activeCategory = items.some((item) => item.slug === currentSlug);
      return <details className="group" key={category} open={activeCategory}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-xs font-black uppercase tracking-wider text-navy">
          <span>{category}</span>
          <Badge variant={activeCategory ? "primary" : "outline"}>{items.length}</Badge>
        </summary>
        <div className="mb-3 grid gap-1 border-l border-border pl-3">
          {items.map((item) => <Link
            className={`px-3 py-2 text-xs leading-5 ${item.slug === currentSlug ? "bg-primary font-bold text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-navy"}`}
            href={`/products/detail/${item.slug}`}
            key={item.slug}
          >{item.title}</Link>)}
        </div>
      </details>;
    })}
  </div>;

  return <aside>
    <div className="hidden lg:sticky lg:top-28 lg:block">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-black uppercase tracking-wider text-navy">Product Directory</h2><span className="text-xs text-muted-foreground">{products.length} products</span></div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-3">{navigation}</div>
    </div>
    <details className="border border-border bg-background lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-bold text-navy"><span className="flex items-center gap-2"><List size={18} className="text-primary"/> Browse Products</span><Badge>{current?.category}</Badge></summary>
      <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">{navigation}</div>
    </details>
    <div className="mt-4 grid grid-cols-2 gap-2">
      {previous ? <Link className="flex min-w-0 items-center gap-2 border border-border p-3 text-xs font-bold text-navy hover:border-primary hover:text-primary" href={`/products/detail/${previous.slug}`}><ChevronLeft size={16} className="shrink-0"/><span className="truncate">{previous.title}</span></Link> : <span/>}
      {next ? <Link className="flex min-w-0 items-center justify-end gap-2 border border-border p-3 text-right text-xs font-bold text-navy hover:border-primary hover:text-primary" href={`/products/detail/${next.slug}`}><span className="truncate">{next.title}</span><ChevronRight size={16} className="shrink-0"/></Link> : <span/>}
    </div>
  </aside>;
}
