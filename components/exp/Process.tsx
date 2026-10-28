"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkflowStep } from "@/content/home.config";
import { IconArrow } from "@/components/icons";

type Step = WorkflowStep & { src: string };

/** "Como trabalho" como uma fila que se puxa de lado: cada etapa é uma coluna com um quadro real. */
export function Process({ steps }: { steps: Step[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const on = () => {
      const max = row.scrollWidth - row.clientWidth;
      setP(max > 0 ? row.scrollLeft / max : 0);
    };
    on();
    row.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      row.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const go = (dir: number) => {
    const row = rowRef.current;
    if (!row) return;
    const col = row.querySelector("li");
    const w = col ? col.getBoundingClientRect().width + 32 : 300;
    row.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="como-trabalho" className="x-process" aria-labelledby="x-process-h">
      <div className="x-process__top x-wrap">
        <h2 id="x-process-h" className="x-h2" data-in>
          Como trabalho
        </h2>
        <div className="x-process__btns">
          <button type="button" className="x-sq" onClick={() => go(-1)} aria-label="Etapa anterior" disabled={p <= 0.001}>
            <IconArrow size={18} className="x-flip" />
          </button>
          <button type="button" className="x-sq" onClick={() => go(1)} aria-label="Próxima etapa" disabled={p >= 0.999}>
            <IconArrow size={18} />
          </button>
        </div>
      </div>
      <div className="x-wrap">
        <div className="x-process__bar" aria-hidden>
          <span style={{ transform: `scaleX(${Math.max(0.08, p)})` }} />
        </div>
      </div>
      <ol ref={rowRef} className="x-process__row" tabIndex={0} aria-label="Etapas">
        {steps.map((s, i) => (
          <li key={s.title} style={{ ["--gap" as string]: `${[96, 40, 128, 64, 112, 48][i % 6]}px` }}>
            <h3 className="x-process__cap">{s.title}</h3>
            <p className="x-process__text">{s.text}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="x-process__img" src={s.src} alt="" width={800} height={1000} loading="lazy" />
          </li>
        ))}
      </ol>
    </section>
  );
}
