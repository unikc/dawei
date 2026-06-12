import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  info: "border-primary bg-primary/5 text-foreground",
  warning: "border-signal bg-signal/5 text-foreground",
  neutral: "border-border bg-muted text-foreground",
};

export function Alert({ className, variant = "info", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof variants }) {
  return <div role="alert" className={cn("border-l-4 p-5 text-sm leading-6", variants[variant], className)} {...props} />;
}
export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-black text-foreground", className)} {...props} />;
}
export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
}
