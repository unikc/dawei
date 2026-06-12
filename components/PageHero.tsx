import { Badge } from "@/components/ui/badge";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: React.ReactNode }) {
  return <section className="bg-navy px-5 py-20 text-white"><div className="mx-auto max-w-7xl"><Badge variant="signal">{eyebrow}</Badge><h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight">{title}</h1>{description&&<p className="mt-5 max-w-3xl leading-8 text-white/65">{description}</p>}{children&&<div className="mt-8">{children}</div>}</div></section>;
}
