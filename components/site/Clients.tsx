import Image from "next/image";
import type { CSSProperties } from "react";
import { CLIENTS, type ClientItem } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Logos têm proporções muito diferentes (HALSTEN é 10:1, o brasão do Our Team é mais alto que largo).
 * Com a mesma altura, os largos dominam e os altos somem. Compensa pela raiz da proporção
 * para que todos pareçam ter o mesmo "peso" visual.
 */
function logoScale(w: number, h: number) {
  const REF = 3; // proporção de referência (logo "normal", ~3:1)
  return Math.min(1.6, Math.max(0.55, Math.sqrt(REF / (w / h))));
}

function Item({ c }: { c: ClientItem }) {
  const meta = [c.project, c.year].filter(Boolean).join(" · ");
  const w = c.logoWidth ?? 160;
  const h = c.logoHeight ?? 40;
  return (
    <li className="clients__item">
      {c.logo ? (
        <Image
          src={c.logo}
          alt={c.name}
          width={w}
          height={h}
          className="clients__logo"
          style={{ "--ls": logoScale(w, h) } as CSSProperties}
        />
      ) : (
        <span className="clients__name">{c.name}</span>
      )}
      {meta && <span className="clients__meta">{meta}</span>}
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
