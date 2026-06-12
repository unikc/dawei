import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Dawei Valve | Industrial Valve Solutions", template: "%s | Dawei Valve" },
  description: "Specialized in ductile iron valves for waterworks and infrastructure projects, with broader valve and piping supply capabilities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
