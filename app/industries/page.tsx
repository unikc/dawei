import { industries } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
export const metadata={title:"Industries"};
export default function Industries(){return <><PageHero eyebrow="Industries & applications" title="Project-focused valve supply." description="We align valve selection and supporting products with application requirements, standards, and procurement needs."/><section className="px-5 py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{industries.map(([n,d],i)=><Card className="border-l-4 border-l-primary bg-muted" key={n}><CardContent className="p-8"><Badge variant="signal">Application 0{i+1}</Badge><h2 className="mt-5 text-2xl font-black text-navy">{n}</h2><p className="mt-4 leading-7 text-muted-foreground">{d}</p></CardContent></Card>)}</div></section></>}
