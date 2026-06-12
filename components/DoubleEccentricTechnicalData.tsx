import { CheckCircle2, Info } from "lucide-react";
import {
  doubleEccentricDimensionHeaders,
  doubleEccentricDimensions,
  doubleEccentricFeatures,
  doubleEccentricMaterials,
  doubleEccentricSpecifications,
} from "@/data/double-eccentric-butterfly";

export function DoubleEccentricTechnicalData() {
  return <section className="border-t bg-white px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <p className="eyebrow">Core technical data</p>
      <h2 className="section-title">Flanged Double Eccentric Butterfly Valve</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Ductile iron, resilient seated configuration for water service. Available in PN10, PN16, and PN25 across DN150-DN2000.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-black text-navy">Technical Specifications</h3>
          <dl className="mt-5 overflow-hidden border">{doubleEccentricSpecifications.map(([term,value])=><div className="grid gap-1 border-b p-4 last:border-b-0 sm:grid-cols-[190px_1fr]" key={term}><dt className="text-xs font-bold uppercase tracking-wide text-navy">{term}</dt><dd className="text-sm text-slate-600">{value}</dd></div>)}</dl>
        </div>
        <div>
          <h3 className="text-xl font-black text-navy">Main Features</h3>
          <div className="mt-5 grid gap-3">{doubleEccentricFeatures.map(feature=><p className="flex gap-3 border-b pb-3 text-sm leading-6 text-slate-600" key={feature}><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-signal"/>{feature}</p>)}</div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-xl font-black text-navy">Parts & Materials</h3>
        <div className="mt-5 overflow-x-auto border"><table className="w-full min-w-[680px] text-left text-xs"><thead className="bg-navy text-white"><tr><th className="px-4 py-3">No.</th><th className="px-4 py-3">Part</th><th className="px-4 py-3">Standard Material</th></tr></thead><tbody>{doubleEccentricMaterials.map((row,i)=><tr className={i%2?"bg-mist":"bg-white"} key={row[0]}>{row.map(cell=><td className="border-t px-4 py-3 text-slate-600" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
      </div>

      <div className="mt-14">
        <h3 className="text-xl font-black text-navy">Dimensions, Operating Data & Weight</h3>
        <p className="mt-2 text-sm text-slate-500">Dimensions are in millimeters. Use the horizontal scroll to review all fields on smaller screens.</p>
        <div className="mt-5 overflow-x-auto border"><table className="min-w-max text-center text-[11px]"><thead className="sticky top-0 bg-navy text-white"><tr>{doubleEccentricDimensionHeaders.map(header=><th className="min-w-[76px] border-r border-white/20 px-2 py-3 font-bold last:border-r-0" key={header}>{header}</th>)}</tr></thead><tbody>{doubleEccentricDimensions.map((row,i)=><tr className={i%2?"bg-blue-50":"bg-white"} key={`${row[0]}-${row[1]}`}>{row.map((cell,j)=><td className={`border-r border-t px-2 py-2.5 text-slate-600 last:border-r-0 ${j<2?"font-bold text-navy":""}`} key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
      </div>

      <div className="mt-8 flex gap-3 border-l-4 border-signal bg-orange-50 p-5 text-sm leading-6 text-slate-600"><Info className="shrink-0 text-signal"/><p>Technical data represents a standard product configuration. Materials, dimensions, torque, weight, coating, and actuation must be confirmed against the final project specification and approved drawings before order.</p></div>
    </div>
  </section>;
}
