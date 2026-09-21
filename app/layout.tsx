import type { Metadata, Viewport } from "next";
import { Archivo, Onest } from "next/font/google";
import { site } from "@/lib/catalog";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

// Display: Archivo com eixo de largura (BIRO expandido/pesado) — font-stretch 125% + peso 900.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

// Texto e navegação: Onest (regular / semibold).
const onest = Onest({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030807",
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
    <html lang="pt-BR" className={`${archivo.variable} ${onest.variable}`}>
      <body>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
