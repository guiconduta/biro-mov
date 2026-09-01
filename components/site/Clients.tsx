import { getClientsWithWork } from "@/lib/catalog";

export function Clients() {
  const clients = getClientsWithWork();

  return (
    <section className="section" id="clients">
      <div className="wrap">
        <div className="sec-head sec-head--left">
          <span className="eyebrow">Confiaram na direção</span>
          <h2 className="h-section">Marcas que já entraram em cena.</h2>
        </div>

        <div className="clients-grid">
          {clients.map((c) => (
            <div className="client-row" key={c.id}>
              <span className="client-row__name">{c.name}</span>
              <span className={"client-row__ctx" + (c.context ? "" : " client-row__ctx--todo")}>
                {c.context || "[linha de autoridade]"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
