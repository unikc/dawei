import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export function CTA() {
  return <section className="bg-valve px-5 py-14 text-white"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-blue-200">Have a project in hand?</p><h2 className="text-3xl font-black">Send us your valve list and specifications.</h2></div><Link className={buttonVariants({variant:"signal",size:"lg"})} href="/contact">Request a Quote</Link></div></section>
}
