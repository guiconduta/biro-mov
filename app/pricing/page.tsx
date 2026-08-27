import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/catalog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Rota existe, mas fica fora do índice e do menu enquanto pricingEnabled=false.
export const metadata: Metadata = {
  title: "Pricing",
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  if (!site.flags.pricingEnabled) notFound();

  return (
    <>
      <Header />
      <main className="wrap section">
        <span className="eyebrow">Pricing</span>
        <h1 className="h-section" style={{ marginTop: 14 }}>Pacotes</h1>
        <p style={{ color: "var(--text-dim)", marginTop: 16 }}>
          [conteúdo de preços — a definir. Reaproveita a linguagem do orçamento BIRO.MOV.]
        </p>
      </main>
      <Footer />
    </>
  );
}
