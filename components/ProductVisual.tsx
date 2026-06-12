import { Product } from "@/data/site";
import Image from "next/image";

export function ProductVisual({ type, image, name, compact = false, label = true }: { type: Product["type"]; image: string; name: string; compact?: boolean; label?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted ${compact ? "h-52" : "h-80"}`}>
      <div className="absolute inset-4 border border-border" />
      <Image src={image} alt={name} fill unoptimized className="object-contain p-8 transition duration-300 group-hover:scale-105" />
      {label&&<span className="absolute bottom-3 right-4 bg-background/80 px-2 py-1 text-[9px] font-bold uppercase tracking-[.2em] text-muted-foreground">Dawei product range</span>}
    </div>
  );
}
