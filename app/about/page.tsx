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
          <p>Dalian Dawei International Co., Ltd is a China&apos;s company that has become one of leading suppliers of various industrial valves, fittings, flanges, pipe, relative piping accessories, various castings and forgings.</p>
          <p>Established in early 90s as a special manufacturer and supplier of industrial products, we have developed more than 9000 items of products serving chemical and petrochemical, power generation oil and gas, pulp and paper, food processing, mining and ship building, civil construction, etc. Most clients are from North America, Europe, Middle East and Southeast Asia.</p>
          <p>All our products are designed, manufactured and tested in strict compliance with standards such as API, ANSI, AWWA, MSS-SP, DIN, BS, JIS, UNI and ISO. Most manufacturers have acquired ISO 9001, API 6D, TUV, CE and NSF certificates.</p>
          <p>We welcome all customers to contact us for more information. With technical knowledge, experience and a comprehensive range of products, our company will be one of your best business partners in China.</p>
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-muted px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Certifications</p>
        <h2 className="section-title">Major Industry Certifications</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Most manufacturers have acquired ISO 9001, API 6D, TUV, CE and NSF certificates.</p>
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {certifications.map(([file,label])=><Card className="bg-background p-4 text-center" key={file}><div className="relative h-56"><Image src={`/images/original/quality/${file}`} alt={label} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain"/></div><b className="mt-3 block text-sm text-navy">{label}</b></Card>)}
        </div>
      </div>
    </section>
  </>;
}
