import Image from "next/image";
import { CLIENTS, type ClientItem } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";

function Item({ c }: { c: ClientItem }) {
  return (
    <li className="clients__item">
      {c.logo ? (
        <Image src={c.logo} alt={c.name} width={160} height={40} className="clients__logo" />
      ) : (
        <span className="clients__name">{c.name}</span>
      )}
      <span className="clients__meta">
        {c.project} · {c.year}
      </span>
    </li>
  );
}

export function Clients() {
  return (
    <section id="clientes" className="clients" aria-labelledby="clientes-label">
      <Reveal className="clients__head">
        <h2 id="clientes-label" className="label">CLIENTES E EXPERIÊNCIAS</h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="marquee">
          <ul className="marquee__track">
            {CLIENTS.map((c, i) => (
              <Item key={i} c={c} />
            ))}
          </ul>
          {/* cópia para o loop contínuo — escondida de leitores de tela e sem reduced-motion */}
          <ul className="marquee__track marquee__track--copy" aria-hidden>
            {CLIENTS.map((c, i) => (
              <Item key={i} c={c} />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
