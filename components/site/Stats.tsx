import { Counter } from "@/components/Counter";
import {
  getClientsWithWork,
  getProjects,
  getVideos,
  getCategories,
} from "@/lib/catalog";

export function Stats() {
  const clients = getClientsWithWork().length;
  const projects = getProjects().length;
  const videos = getVideos().length;
  const formats = getCategories().length;

  const items = [
    { to: clients, suffix: "", label: "Clientes atendidos" },
    { to: projects, suffix: "", label: "Projetos entregues" },
    { to: videos, prefix: "+", label: "Vídeos produzidos" },
    { to: formats, suffix: "", label: "Formatos de entrega" },
  ];

  return (
    <section className="section stats" aria-label="Números">
      <div className="wrap">
        <div className="stats__grid">
          {items.map((it) => (
            <div className="stat" key={it.label}>
              <div className="stat__n">
                <Counter to={it.to} prefix={it.prefix} suffix={it.suffix} />
              </div>
              <span className="stat__l">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
