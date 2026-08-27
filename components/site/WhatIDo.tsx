import { getCapabilities } from "@/lib/catalog";
import { IconFrame, IconSequence, IconMotion, IconBuilding } from "@/components/icons";

const ICONS: Record<string, React.ReactNode> = {
  direcao: <IconFrame size={30} />,
  "social-films": <IconSequence size={30} />,
  "edicao-ritmo": <IconMotion size={30} />,
  imobiliario: <IconBuilding size={30} />,
};

export function WhatIDo() {
  const caps = getCapabilities();

  return (
    <section className="section" id="what-i-do">
      <div className="wrap">
        <div className="sec-head__l" style={{ marginBottom: 44 }}>
          <span className="eyebrow">What I Do</span>
          <h2 className="h-section">Áreas de capacidade</h2>
        </div>

        <div className="cap-grid">
          {caps.map((cap, i) => (
            <div className="cap" key={cap.id}>
              {ICONS[cap.id] ?? <IconFrame size={30} />}
              <span className="cap__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cap__t">{cap.label}</span>
              <p>{cap.intent}</p>
            </div>
          ))}
        </div>
        <p className="note">Textos de intenção em rascunho — ajuste na sua voz.</p>
      </div>
    </section>
  );
}
