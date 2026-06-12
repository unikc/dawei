import { Product } from "@/data/site";
import Image from "next/image";

export function ProductVisual({ type, image, name, compact = false }: { type: Product["type"]; image: string; name: string; compact?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-100 ${compact ? "h-52" : "h-80"}`}>
      <div className="absolute inset-4 border border-slate-200" />
      <Image src={image} alt={name} fill unoptimized className="object-contain p-8 transition duration-300 group-hover:scale-105" />
      <span className="absolute bottom-3 right-4 bg-white/80 px-2 py-1 text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">Dawei product range</span>
    </div>
  );
}
