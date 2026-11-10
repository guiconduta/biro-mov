"use client";

import { type PointerEvent, type ReactNode } from "react";
import { WHY_ME, type WhyIcon } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { IconChart, IconClipboard, IconEye, IconPalette, IconSparkle, IconUsers } from "@/components/icons";

const ICONS: Record<WhyIcon, (p: { size?: number }) => ReactNode> = {
  users: IconUsers,
  palette: IconPalette,
  eye: IconEye,
  sparkle: IconSparkle,
  chart: IconChart,
  clipboard: IconClipboard,
};

/** "[N]" fica visível como placeholder até o número real entrar no config. */
function withPlaceholders(text: string) {
  return text.split(/(\[N\])/).map((part, i) =>
    part === "[N]" ? (
      <span key={i} className="todo">[N]</span>
    ) : (
      part
    ),
  );
}

/** Luz que acompanha o cursor dentro do cartão. */
function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Os motivos ficam todos à vista: cada cartão entra em foco ao rolar, um depois do outro
 * (o atraso vem do Reveal). Ninguém precisa clicar para ler.
 */
export function WhyMe() {
  const items = WHY_ME.items;

  return (
    <section id="por-que" className="why" aria-labelledby="why-title">
      <div className="why__glow" aria-hidden />
      <Reveal className="why__head">
        <p className="label">{WHY_ME.eyebrow}</p>
        <h2 id="why-title" className="why__title">{WHY_ME.title}</h2>
        <p className="why__sub">{WHY_ME.sub}</p>
      </Reveal>

      <ul className="why__grid">
        {items.map((it, i) => {
          const Icon = ICONS[it.icon];
          return (
            <li key={it.title}>
              <Reveal delay={(i % 3) * 110}>
                <article className="why__card" onPointerMove={spotlight}>
                  <div className="why__content">
                    <div className="why__card-top">
                      <span className="why__icon">
                        <Icon size={20} />
                      </span>
                      <span className="why__n" aria-hidden>{pad(i + 1)}</span>
                    </div>
                    {it.kicker && <span className="why__kicker">{it.kicker}</span>}
                    <h3 className="why__card-title">{it.title}</h3>
                    <p className="why__text">{withPlaceholders(it.text)}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
