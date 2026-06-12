import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata={title:"Request a Quote"};

export default function Contact(){
  return <>
    <section className="bg-navy px-5 py-20 text-white"><div className="mx-auto max-w-7xl"><p className="eyebrow !text-blue-300">Contact / RFQ</p><h1 className="text-5xl font-black">Tell us what your project needs.</h1></div></section>
    <section className="px-5 py-16"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
      <div className="lg:col-span-2"><h2 className="text-2xl font-black text-navy">Dalian Dawei International Co., Ltd.</h2><p className="mt-4 leading-7 text-muted-foreground">Include valve type, size, pressure rating, material, standard, quantity, and target delivery date for a faster quotation.</p><div className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"><p><b className="text-navy">Address:</b><br/>#11, 18th Floor, No.171 Luxun Road, Dalian, China 116001</p><p><b className="text-navy">Tel:</b> +86 411 8278 3480</p><p><b className="text-navy">Fax:</b> +86 411 8278 3342</p></div><div className="mt-8 grid gap-3 font-bold text-primary"><a className="flex items-center gap-3" href="mailto:guogangliu@vip.sina.com"><Mail/> guogangliu@vip.sina.com</a><a className="flex items-center gap-3" href="mailto:guogangliu@sina.com"><Mail/> guogangliu@sina.com</a></div></div>
      <Card className="lg:col-span-3"><CardContent className="p-7"><form action="mailto:guogangliu@vip.sina.com?cc=guogangliu@sina.com&subject=Dawei%20Valve%20RFQ" method="post" encType="text/plain" className="grid gap-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-foreground">Name<Input name="Name" required className="mt-2" placeholder="Your name"/></label><label className="text-sm font-bold text-foreground">Company<Input name="Company" required className="mt-2" placeholder="Company name"/></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-foreground">Email<Input name="Email" required type="email" className="mt-2" placeholder="name@company.com"/></label><label className="text-sm font-bold text-foreground">Country<Input name="Country" className="mt-2" placeholder="Country / region"/></label></div><label className="text-sm font-bold text-foreground">Products / Requirements<Textarea name="Requirements" required className="mt-2 min-h-36" placeholder="Product, specifications, quantity, application..."/></label><Button type="submit" variant="signal" className="w-fit"><Send size={16}/> Submit RFQ</Button><p className="text-xs text-muted-foreground">Submitting opens your email application addressed to both Dawei contact emails.</p></form></CardContent></Card>
    </div></section>
  </>;
}
