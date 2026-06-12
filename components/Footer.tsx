import Link from "next/link";
import { products } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div><b className="text-2xl">DALIAN DAWEI</b><p className="mt-4 text-sm leading-7 text-white/60">Focused on ductile iron metal seated gate valves and flanged double eccentric butterfly valves for international B2B customers.</p></div>
        <div><h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-signal">Core Products</h3>{products.slice(0,5).map(p=><Link className="mb-2 block text-sm text-white/65 hover:text-white" href={`/products/${p.slug}`} key={p.slug}>{p.name}</Link>)}</div>
        <div><h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-signal">Company</h3>{["Products","Industries","Quality","About","Contact"].map(x=><Link className="mb-2 block text-sm text-white/65 hover:text-white" href={`/${x.toLowerCase()}`} key={x}>{x}</Link>)}</div>
        <div><h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-signal">Start an RFQ</h3><p className="text-sm leading-7 text-white/65">Send your valve list, technical specifications, quantities, and target delivery date.</p><div className="mt-5 grid gap-2"><a className={buttonVariants({variant:"outline",size:"sm",className:"min-w-0 justify-start whitespace-normal break-all border-white/30 bg-transparent text-left text-[10px] text-white hover:bg-white/10 hover:text-white"})} href="mailto:guogangliu@vip.sina.com">guogangliu@vip.sina.com</a><a className={buttonVariants({variant:"outline",size:"sm",className:"min-w-0 justify-start whitespace-normal break-all border-white/30 bg-transparent text-left text-[10px] text-white hover:bg-white/10 hover:text-white"})} href="mailto:guogangliu@sina.com">guogangliu@sina.com</a></div></div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">© 2026 Dalian Dawei International Co., Ltd. All rights reserved.</div>
    </footer>
  );
}
