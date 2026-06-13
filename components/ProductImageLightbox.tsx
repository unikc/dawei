"use client";

import Image from "next/image";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ProductImageLightbox({
  src,
  alt,
  featured = false,
  className = "",
}: {
  src: string;
  alt: string;
  featured?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [fitScreen, setFitScreen] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const closeLightbox = () => {
    setOpen(false);
    setFitScreen(false);
  };

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setFitScreen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge ${alt}`}
        className={`group relative overflow-hidden border border-border bg-background text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${featured ? "col-span-2 h-56" : "h-36"} ${className}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
          onLoad={(event) => setNaturalSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
        />
        <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-navy/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={12} /> Enlarge
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/95 p-4 md:p-8"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close enlarged image"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/30 bg-navy text-white hover:bg-primary"
            onClick={closeLightbox}
          >
            <X size={22} />
          </button>
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="flex h-11 items-center gap-2 border border-white/30 bg-navy px-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary"
              onClick={() => setFitScreen((value) => !value)}
            >
              {fitScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {fitScreen ? "Actual size" : "Fit screen"}
            </button>
            {naturalSize.width > 0 && <span className="bg-navy/80 px-2 py-1 text-xs text-white/70">Original: {naturalSize.width} × {naturalSize.height}px</span>}
          </div>
          <div
            className="relative"
            style={fitScreen || !naturalSize.width ? { width: "100%", height: "100%", maxWidth: "80rem" } : { width: `${naturalSize.width}px`, height: `${naturalSize.height}px`, maxWidth: "calc(100vw - 2rem)", maxHeight: "calc(100vh - 2rem)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={src} alt={alt} fill unoptimized className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
