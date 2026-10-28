"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import { WORKFLOW_DATA } from "@/content/home.config";
import { IconArrow } from "@/components/icons";

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
 * "Como trabalho" como a timeline de um editor: as etapas são clipes na trilha de vídeo e a etapa
 * sob a agulha aparece grande no monitor. A navegação é por clique (clipes, setas, teclado ou
 * arrastar no celular) — a seção tem uma tela de altura e não prende a rolagem.
 */
export function Workflow() {
  const steps = WORKFLOW_DATA;
  const n = steps.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const pRef = useRef(n ? 0.5 / n : 0); // posição atual da agulha (0–1)
  const rafRef = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const bars = useMemo(() => waveform(180), []);

  const paint = (p: number) => {
    pRef.current = p;
    stageRef.current?.style.setProperty("--p", p.toFixed(5));
    if (tcRef.current) tcRef.current.textContent = timecode(Math.round(p * n * SECONDS_PER_STEP * FPS));
  };

  useEffect(() => {
    if (n) paint(pRef.current);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // a agulha corre até o meio do clipe escolhido, como num "jump" do editor
  const goTo = (i: number) => {
    if (!n) return;
    const idx = Math.max(0, Math.min(n - 1, i));
    setActive(idx);
    const from = pRef.current;
    const to = (idx + 0.5) / n;
    cancelAnimationFrame(rafRef.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || from === to) {
      paint(to);
      return;
    }
    const dur = Math.min(900, 380 + Math.abs(to - from) * n * 140);
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      paint(from + (to - from) * e);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  // celular: arrastar o dedo para o lado no monitor troca de etapa
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    swipeRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = swipeRef.current;
    swipeRef.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(t.clientY - s.y) * 1.4) goTo(active + (dx < 0 ? 1 : -1));
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
      className="workflow"
      aria-labelledby="workflow-label"
      style={{ "--n": n } as CSSProperties}
      data-timeline-takeover
    >
      <div ref={stageRef} className="workflow__stage" onKeyDown={onKey}>
        <div className="workflow__top">
          <h2 id="workflow-label" className="label">COMO TRABALHO</h2>
          <span className="workflow__tc" aria-hidden>
            <span className="workflow__rec" />
            <span ref={tcRef}>00:00:00:00</span>
          </span>
        </div>

        {/* monitor: a etapa sob a agulha, grande */}
        <div className="workflow__monitor" aria-live="polite" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="workflow__ctrl">
            <button type="button" className="workflow__nav" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Etapa anterior">
              <IconArrow size={16} className="workflow__nav-back" />
            </button>
            <span className="workflow__count">
              {pad(active + 1)} <span>/ {pad(n)}</span>
            </span>
            <button type="button" className="workflow__nav" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label="Próxima etapa">
              <IconArrow size={16} />
            </button>
          </div>
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
