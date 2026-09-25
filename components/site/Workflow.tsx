"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { WORKFLOW_DATA } from "@/content/home.config";

const FPS = 24;
const SECONDS_PER_STEP = 8; // só visual: cada etapa "dura" 8s na régua

const pad = (n: number) => String(n).padStart(2, "0");
function timecode(frames: number) {
  const s = Math.floor(frames / FPS);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
}

/** Forma de onda decorativa da trilha de áudio — determinística (igual no servidor e no browser). */
function waveform(bars: number) {
  return Array.from({ length: bars }, (_, i) => {
    const x = i / bars;
    const v =
      0.35 +
      0.3 * Math.abs(Math.sin(x * 23.1)) +
      0.2 * Math.abs(Math.sin(x * 61.7 + 1.3)) +
      0.15 * Math.abs(Math.sin(x * 139.3 + 0.4));
    return Math.min(1, v * (0.55 + 0.45 * Math.abs(Math.sin(x * 7.3 + 0.8))));
  });
}

function Wave({ bars }: { bars: number[] }) {
  const w = bars.length * 3;
  return (
    <svg viewBox={`0 0 ${w} 40`} preserveAspectRatio="none" className="wtl__wave-svg">
      {bars.map((v, i) => (
        <rect key={i} x={i * 3} y={20 - v * 18} width={1.6} height={v * 36} rx={0.8} />
      ))}
    </svg>
  );
}

/**
 * "Como trabalho" como a timeline de um editor: as etapas são clipes na trilha de vídeo, a rolagem
 * move a agulha e a etapa que ela toca aparece grande no monitor. A seção é alta de propósito —
 * o palco fica preso na tela (sticky) enquanto a rolagem "toca" a timeline.
 */
export function Workflow() {
  const steps = WORKFLOW_DATA;
  const n = steps.length;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const bars = useMemo(() => waveform(180), []);

  useEffect(() => {
    const sec = sectionRef.current;
    const stage = stageRef.current;
    if (!sec || !stage || !n) return;
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      stage.style.setProperty("--p", p.toFixed(5));
      if (tcRef.current) tcRef.current.textContent = timecode(Math.round(p * n * SECONDS_PER_STEP * FPS));
      const idx = Math.min(n - 1, Math.floor(p * n));
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  // clicar num clipe leva a agulha até o meio dele
  const goTo = (i: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    const total = sec.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * total, behavior: "smooth" });
  };

  if (!n) {
    return (
      <section id="como-trabalho" className="workflow workflow--empty" aria-labelledby="workflow-label">
        <h2 id="workflow-label" className="label">COMO TRABALHO</h2>
        <p className="workflow__empty todo">[WORKFLOW_DATA]</p>
      </section>
    );
  }

  const step = steps[active];
  return (
    <section
      id="como-trabalho"
      ref={sectionRef}
      className="workflow"
      aria-labelledby="workflow-label"
      style={{ "--n": n } as CSSProperties}
      data-timeline-takeover
    >
      <div ref={stageRef} className="workflow__stage">
        <div className="workflow__top">
          <h2 id="workflow-label" className="label">COMO TRABALHO</h2>
          <span className="workflow__tc" aria-hidden>
            <span className="workflow__rec" />
            <span ref={tcRef}>00:00:00:00</span>
          </span>
        </div>

        {/* monitor: a etapa sob a agulha, grande */}
        <div className="workflow__monitor" aria-hidden>
          <span className="workflow__count">
            {pad(active + 1)} <span>/ {pad(n)}</span>
          </span>
          <p className="workflow__title" key={`t${active}`}>{step.title}</p>
          {step.text ? (
            <p className="workflow__text" key={`x${active}`}>{step.text}</p>
          ) : (
            <p className="workflow__text todo" key={`x${active}`}>[TEXTO DA ETAPA]</p>
          )}
        </div>

        {/* timeline do editor */}
        <div className="wtl">
          <div className="wtl__heads" aria-hidden>
            <span />
            <span>V1</span>
            <span>A1</span>
          </div>
          <div className="wtl__lanes">
            <div className="wtl__ruler" aria-hidden>
              {Array.from({ length: n + 1 }, (_, i) => (
                <span key={i} style={{ left: `${(i / n) * 100}%` }}>
                  {timecode(i * SECONDS_PER_STEP * FPS)}
                </span>
              ))}
            </div>
            <ol className="wtl__lane wtl__lane--v">
              {steps.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="wtl__clip"
                    data-state={i < active ? "past" : i === active ? "on" : "next"}
                    aria-current={i === active ? "step" : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="wtl__clip-n">{pad(i + 1)}</span>
                    <span className="wtl__clip-t">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="wtl__lane wtl__lane--a" aria-hidden>
              <div className="wtl__wave">
                <Wave bars={bars} />
              </div>
              <div className="wtl__wave wtl__wave--lit">
                <Wave bars={bars} />
              </div>
            </div>
            <span className="wtl__playhead" aria-hidden />
          </div>
        </div>
      </div>

      {/* leitores de tela recebem a lista inteira, sem depender da rolagem */}
      <ol className="sr-only">
        {steps.map((s, i) => (
          <li key={i}>
            {s.title}
            {s.text ? ` — ${s.text}` : ""}
          </li>
        ))}
      </ol>
    </section>
  );
}
