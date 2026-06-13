import { CheckCircle2, Info } from "lucide-react";
import {
  doubleEccentricDimensionHeaders,
  doubleEccentricDimensions,
  doubleEccentricFeatures,
  doubleEccentricMaterials,
  doubleEccentricSpecifications,
} from "@/data/double-eccentric-butterfly";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductImageLightbox } from "@/components/ProductImageLightbox";

export function DoubleEccentricTechnicalData() {
  return <section className="border-t border-border bg-background px-5 py-10 md:px-8">
    <div className="mx-auto max-w-7xl">
      <p className="eyebrow">Core technical data</p>
      <h2 className="section-title">Flanged Double Eccentric Butterfly Valve</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Ductile iron, resilient seated configuration for water service. Available in PN10, PN16, and PN25 across DN150-DN2000.</p>

      <div className="mt-6">
        <h3 className="text-xl font-black text-navy">High-resolution Technical Sheets</h3>
        <p className="mt-2 text-sm text-muted-foreground">Click either sheet to inspect the drawing, materials, and dimensional data at high resolution.</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <ProductImageLightbox className="h-72 md:h-96" src="/images/technical/double-eccentric-overview.jpg" alt="Double eccentric butterfly valve technical overview"/>
          <ProductImageLightbox className="h-72 md:h-96" src="/images/technical/double-eccentric-dimensions.jpg" alt="Double eccentric butterfly valve dimensions and weights"/>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card><CardContent className="p-5">
          <h3 className="text-xl font-black text-navy">Technical Specifications</h3>
          <dl className="mt-4 overflow-hidden border">{doubleEccentricSpecifications.map(([term,value])=><div className="grid gap-1 border-b p-3 last:border-b-0 sm:grid-cols-[190px_1fr]" key={term}><dt className="text-xs font-bold uppercase tracking-wide text-navy">{term}</dt><dd className="text-sm text-muted-foreground">{value}</dd></div>)}</dl>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <h3 className="text-xl font-black text-navy">Main Features</h3>
          <div className="mt-4 grid gap-2">{doubleEccentricFeatures.map(feature=><p className="flex gap-3 border-b pb-2 text-sm leading-5 text-muted-foreground last:border-b-0" key={feature}><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-signal"/>{feature}</p>)}</div>
        </CardContent></Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-black text-navy">Parts & Materials</h3>
        <div className="mt-3"><Table className="min-w-[680px] text-xs"><TableHeader><TableRow><TableHead>No.</TableHead><TableHead>Part</TableHead><TableHead>Standard Material</TableHead></TableRow></TableHeader><TableBody>{doubleEccentricMaterials.map(row=><TableRow key={row[0]}>{row.map(cell=><TableCell key={cell}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table></div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-black text-navy">Dimensions, Operating Data & Weight</h3>
        <p className="mt-2 text-sm text-muted-foreground">Dimensions are in millimeters. Use the horizontal scroll to review all fields on smaller screens.</p>
        <div className="mt-3"><Table className="text-center text-[11px]"><TableHeader className="sticky top-0"><TableRow>{doubleEccentricDimensionHeaders.map(header=><TableHead className="min-w-[76px] border-r border-white/20 px-2 text-center last:border-r-0" key={header}>{header}</TableHead>)}</TableRow></TableHeader><TableBody>{doubleEccentricDimensions.map(row=><TableRow key={`${row[0]}-${row[1]}`}>{row.map((cell,j)=><TableCell className={`border-r px-2 py-2 last:border-r-0 ${j<2?"font-bold text-navy":""}`} key={j}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table></div>
      </div>

      <Alert variant="warning" className="mt-5"><Info className="mb-2 text-signal"/><AlertTitle>Confirm Before Order</AlertTitle><AlertDescription>Technical data represents a standard product configuration. Materials, dimensions, torque, weight, coating, and actuation must be confirmed against the final project specification and approved drawings before order.</AlertDescription></Alert>
    </div>
  </section>;
}
