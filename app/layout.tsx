import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Dawei Valve | Industrial Valve Solutions", template: "%s | Dawei Valve" },
  description: "Ductile iron metal seated gate valves and flanged double eccentric butterfly valves for waterworks and infrastructure projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
