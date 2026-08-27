import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getFeaturedCases } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Cases",
  description: "Cases em profundidade — direção que converte.",
};

export default function CasesIndex() {
  const cases = getFeaturedCases();

  return (
    <>
      <Header />
      <main className="wrap section">
        <span className="eyebrow">Featured Cases</span>
        <h1 className="h-section" style={{ marginTop: 14, marginBottom: 40 }}>Cases</h1>

        {cases.length === 0 ? (
          <p style={{ color: "var(--text-dim)" }}>
            Cases em curadoria. Cada case junta um projeto, seus vídeos e a história do
            resultado — 2 a 4, escolhidos a dedo.
          </p>
        ) : (
          <div className="cases-grid">
            {cases.map((c, i) => (
              <Link className="case-card" key={c.id} href={`/cases/${c.slug}`}>
                <span className="eyebrow">CASE {String(i + 1).padStart(2, "0")}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <span className="case-card__t">{c.title}</span>
                  <p>{c.summary}</p>
                  <span className="link-accent">VER CASE →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
