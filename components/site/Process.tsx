import Image from "next/image";
import { site } from "@/lib/catalog";

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="process__bg">
        <Image src="/branding/filmmaker.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="process__scrim" />

      <div className="process__inner wrap">
        <div className="sec-head__l" style={{ marginBottom: 52 }}>
          <span className="eyebrow">Process</span>
          <h2 className="h-section">Como o projeto acontece</h2>
        </div>

        <div>
          {site.process.map((s) => (
            <div className="step" key={s.step}>
              <div className="step__n">{s.step}</div>
              <div>
                <div className="step__t">{s.title}</div>
                <div className="step__d">Você recebe: {s.deliverable}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="note">Etapas e entregáveis em rascunho — reescreva na sua voz.</p>
      </div>
    </section>
  );
}
