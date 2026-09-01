import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/lib/catalog";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070707",
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
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
