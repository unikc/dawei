"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/site";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-14 w-20 overflow-hidden"><Image src="/images/original/dawei-logo.jpg" alt="Dawei logo" fill sizes="80px" className="object-cover object-center"/></span>
            <span><b className="block text-lg tracking-tight text-navy">DALIAN DAWEI</b><small className="block text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground">International valve &amp; piping supply since the early 1990s</small></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-navy lg:flex">
            <Link href="/">Home</Link>
            <div className="group relative py-8"><Link className="flex items-center gap-1" href="/products">Products <ChevronDown size={14}/></Link>
              <div className="invisible absolute left-1/2 top-[78px] w-[560px] -translate-x-1/2 border-t-4 border-signal bg-background p-6 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                <p className="mb-4 text-xs uppercase tracking-widest text-valve">Product categories</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">{products.map(p => <Link className="border-b border-border pb-2 hover:text-primary" key={p.slug} href={`/products/${p.slug}`}>{p.name}</Link>)}</div>
              </div>
            </div>
            <Link href="/industries">Industries</Link><Link href="/quality">Quality</Link><Link href="/about">About</Link>
            <Link href="/contact" className={buttonVariants({variant:"signal",size:"sm"})}>Request a Quote</Link>
          </nav>
          <button className="lg:hidden" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <div className="border-t border-border bg-background px-5 py-5 lg:hidden">{["Home","Products","Industries","Quality","About","Contact"].map(x => <Link onClick={() => setOpen(false)} className="block border-b border-border py-3 font-bold text-navy" href={x === "Home" ? "/" : `/${x.toLowerCase()}`} key={x}>{x}</Link>)}</div>}
      </header>
    </>
  );
}
