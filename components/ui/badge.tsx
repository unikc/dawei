import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-primary-foreground",
  signal: "bg-signal text-signal-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border bg-background text-foreground",
};

export function Badge({ className, variant = "primary", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return <span className={cn("inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.16em]", variants[variant], className)} {...props} />;
}
