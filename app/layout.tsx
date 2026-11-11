import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/catalog";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

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
    <html lang="pt-BR" className={onest.variable}>
      <body>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
