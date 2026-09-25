"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
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

/**
 * Motivos revelados um a um: o primeiro já vem aberto, o próximo mostra "Clique para descobrir"
 * e os demais ficam velados. "Revelar todos" abre tudo de uma vez (e quem usa movimento reduzido
 * já recebe tudo aberto).
 */
export function WhyMe() {
  const items = WHY_ME.items;
  const total = items.length;
  const [open, setOpen] = useState(1);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const focusNext = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setOpen(total);
  }, [total]);

  // teclado: depois de revelar, o foco segue para o próximo "clique para descobrir"
  useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    const next = cardRefs.current[open]?.querySelector<HTMLButtonElement>(".why__veil");
    next?.focus({ preventScroll: true });
  }, [open]);

  const reveal = () => {
    focusNext.current = true;
    setOpen((n) => Math.min(total, n + 1));
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="por-que" className="why" aria-labelledby="why-title">
      <div className="why__glow" aria-hidden />
      <Reveal className="why__head">
        <p className="label">{WHY_ME.eyebrow}</p>
        <h2 id="why-title" className="why__title">{WHY_ME.title}</h2>
        <p className="why__sub">{WHY_ME.sub}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="why__bar">
          <span className="why__count" aria-live="polite">
            <b>{pad(open)}</b> / {pad(total)} motivos revelados
          </span>
          <span className="why__progress" aria-hidden>
            <span style={{ width: `${(open / total) * 100}%` }} />
          </span>
          {open < total && (
            <button type="button" className="why__all" onClick={() => setOpen(total)}>
              Revelar todos
            </button>
          )}
        </div>

        <ul className="why__grid">
          {items.map((it, i) => {
            const state = i < open ? "open" : i === open ? "next" : "locked";
            const Icon = ICONS[it.icon];
            return (
              <li
                key={it.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="why__card"
                data-state={state}
                onPointerMove={state === "open" ? spotlight : undefined}
                style={{ ["--i" as string]: i }}
              >
                <div className="why__content" inert={state !== "open"} aria-hidden={state !== "open"}>
                  <span className="why__icon">
                    <Icon size={20} />
                  </span>
                  <span className="why__kicker">{it.kicker}</span>
                  <h3 className="why__card-title">{it.title}</h3>
                  <p className="why__text">{withPlaceholders(it.text)}</p>
                </div>

                {state === "next" && (
                  <button type="button" className="why__veil" onClick={reveal} aria-label={`Revelar motivo ${pad(i + 1)}`}>
                    <span className="why__veil-n">{pad(i + 1)}</span>
                    <span className="why__veil-cta">Clique para descobrir</span>
                  </button>
                )}
                {state === "locked" && (
                  <span className="why__veil why__veil--locked" aria-hidden>
                    <span className="why__veil-n">{pad(i + 1)}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
