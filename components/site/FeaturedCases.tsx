import Link from "next/link";
import { getFeaturedCases, getProject } from "@/lib/catalog";

const PLACEHOLDERS = [
  { id: "giconduta-imobiliario", label: "GiConduta — Imobiliário" },
  { id: "amendonca-institucional", label: "Amendonça Concretos" },
];

export function FeaturedCases() {
  const cases = getFeaturedCases();

  return (
    <section className="section section--jade" id="cases">
      <div className="wrap">
        <div className="topic" style={{ marginBottom: 44 }}>
          <span className="eyebrow">Featured Cases — SEQ. 02</span>
          <span className="topic__rule" />
          <h2 className="h-section">Cases em profundidade</h2>
        </div>

        <div className="cases-grid">
          {cases.length > 0
            ? cases.map((c, i) => (
                <Link className="case-card" key={c.id} href={`/cases/${c.slug}`}>
                  <span className="eyebrow">CASE {String(i + 1).padStart(2, "0")}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <span className="case-card__t">{c.title}</span>
                    <p>{c.summary}</p>
                    <span className="link-accent">VER CASE →</span>
                  </div>
                </Link>
              ))
            : PLACEHOLDERS.map((p, i) => {
                const proj = getProject(p.id);
                return (
                  <div className="case-card" key={p.id}>
                    <span className="eyebrow">CASE {String(i + 1).padStart(2, "0")}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <span className="case-card__t">{proj?.name ?? p.label}</span>
                      <p className="todo">
                        [resumo do case — desafio, abordagem e resultado, em curadoria]
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
        {cases.length === 0 && (
          <p className="note">2–4 cases · quais projetos viram case = sua escolha.</p>
        )}
      </div>
    </section>
  );
}
