import { site } from "@/lib/catalog";

export function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow eyebrow--center">Antes da câmera</span>
          <h2 className="h-section">Todo vídeo começa com uma decisão.</h2>
          <p className="lead">
            Antes de gravar, definimos o que a peça precisa fazer e como ela chega até o
            público certo.
          </p>
        </div>

        <div className="process__grid">
          {site.process.map((s) => (
            <div className="step" key={s.step}>
              <div className="step__n" translate="no">{s.step}</div>
              <span className="step__t">{s.title}</span>
              <div className="step__d">{s.deliverable}</div>
            </div>
          ))}
        </div>
        <p className="note">Etapas e entregáveis em rascunho — reescreva na sua voz.</p>
      </div>
    </section>
  );
}
