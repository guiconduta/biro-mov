import type { Metadata, Viewport } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/catalog";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020202",
};

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.slogan,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${site.name} — ${site.descriptor}`,
    description: site.slogan,
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
