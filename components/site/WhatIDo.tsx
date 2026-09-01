import { getCapabilities } from "@/lib/catalog";

export function WhatIDo() {
  const caps = getCapabilities();

  return (
    <section className="section" id="what-i-do">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow"><span className="eyebrow__n">04</span>O que eu faço</span>
          <h2 className="h-section">Direção do conceito à entrega.</h2>
          <p className="lead">
            Cada peça começa por uma decisão: apresentar, explicar, posicionar ou vender.
          </p>
        </div>

        <div className="cap-grid">
          {caps.map((cap, i) => (
            <div className="card cap" key={cap.id}>
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
