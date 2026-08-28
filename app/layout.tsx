import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/catalog";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05100c",
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
    <html lang="pt-BR" className={satoshi.variable}>
      <body>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
