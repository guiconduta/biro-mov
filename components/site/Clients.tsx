import { getClientsWithWork } from "@/lib/catalog";

export function Clients() {
  const clients = getClientsWithWork();

  return (
    <section className="section section--jade" id="clients">
      <div className="wrap">
        <div className="topic" style={{ marginBottom: 44 }}>
          <span className="eyebrow">Clients</span>
          <span className="topic__rule" />
          <h2 className="h-section" style={{ maxWidth: "18ch" }}>
            Marcas que confiaram a direção da própria imagem.
          </h2>
        </div>

        <div className="clients-grid">
          {clients.map((c) => (
            <div className="client-row" key={c.id}>
              <span className="client-row__name">{c.name}</span>
              <span
                className={
                  "client-row__ctx" + (c.context ? "" : " client-row__ctx--todo")
                }
              >
                {c.context || "[linha de autoridade]"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
