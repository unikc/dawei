import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/card";

export const metadata={title:"About Us"};

const certifications=[
  ["certification_1.png","ISO 9001"],
  ["certification_2.png","API 6D"],
  ["certification_3.png","CE / PED"],
  ["certification_4.png","Fire Safe Test"],
];

export default function About(){
  return <>
    <PageHero eyebrow="About Us" title="Dalian Dawei International Co., Ltd."/>
    <section className="px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="section-title">Company Profile</h2>
        <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
          <p>Dalian Dawei International Co., Ltd. is an industrial valve and piping supplier based in Dalian, China. Since the early 1990s, we have supplied valves, fittings, flanges, pipes, and related piping products to customers across North America, Europe, the Middle East, and Southeast Asia.</p>
          <p>Today, our offering centers on ductile iron metal seated gate valves and flanged double eccentric butterfly valves for waterworks and municipal infrastructure projects. Building on three decades of export experience across chemical and petrochemical, power generation, oil and gas, and civil construction industries, we also coordinate complete project packages &mdash; check valves, air valves, strainers, fittings, flanges, and pipes &mdash; so customers can consolidate their valve and piping supply with a single partner.</p>
          <p>Our products are designed, manufactured, and tested to international standards including EN, BS, DIN, AWWA, ANSI, API, MSS-SP, JIS, and ISO. With deep sourcing knowledge and decades of project experience, we aim to be a reliable long-term partner for your projects in China.</p>
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-muted px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Certifications</p>
        <h2 className="section-title">Major Industry Certifications</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">We work with established manufacturing partners holding ISO 9001, API 6D, CE/PED, and related certifications. Certification scope varies by product and manufacturer &mdash; please specify required certificates and standards in your inquiry.</p>
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {certifications.map(([file,label])=><Card className="bg-background p-4 text-center" key={file}><div className="relative h-56"><Image src={`/images/original/quality/${file}`} alt={label} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain"/></div><b className="mt-3 block text-sm text-navy">{label}</b></Card>)}
        </div>
      </div>
    </section>
  </>;
}
