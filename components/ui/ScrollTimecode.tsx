"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";

const FPS = 24;
const PX_PER_FRAME = 6; // rolar 6px = avançar 1 quadro: a velocidade do scroll vira a velocidade do timecode

type Mark = { id: string; label: string; at: number };

function timecode(frames: number) {
  const f = frames % FPS;
  const s = Math.floor(frames / FPS);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(f)}`;
}

function sectionLabel(sec: HTMLElement) {
  if (sec.id === "inicio") return "Início";
  const l = sec.querySelector(".label")?.textContent?.trim();
  if (l) return l;
  const by = sec.getAttribute("aria-labelledby");
  return (by && document.getElementById(by)?.textContent?.trim()) || sec.id;
}

/**
 * A página inteira como um filme: uma linha no pé da tela funciona como a timeline do editor.
 * Rolar = rodar o filme (o timecode corre), cada seção é um marcador, e dá para clicar ou
 * arrastar a agulha para ir direto a um ponto. Some na abertura (o hero fica limpo) e dentro
 * do "Como trabalho", que tem a timeline dele.
 */
export function ScrollTimecode() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [current, setCurrent] = useState(0);
  const dragging = useRef(false);

  // marcadores: onde cada seção começa, em % da rolagem total
  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const secs = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
      setMarks(
        secs.map((s) => ({
          id: s.id,
          label: sectionLabel(s),
          at: Math.min(1, (s.getBoundingClientRect().top + window.scrollY) / max),
        })),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !marks.length) return;
    let raf = 0;
    let lastText = "";
    let lastIdx = -1;
    let lastShow: boolean | null = null;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--p", p.toFixed(5));

      const text = timecode(Math.round(y / PX_PER_FRAME));
      if (text !== lastText && timeRef.current) timeRef.current.textContent = lastText = text;

      let idx = 0;
      marks.forEach((m, i) => {
        if (m.at * max <= y + vh * 0.4) idx = i; // a seção "entra" quando o topo passa de 40% da tela
      });
      if (idx !== lastIdx) {
        lastIdx = idx;
        setCurrent(idx);
      }

      // some na abertura e enquanto a timeline do "Como trabalho" está na tela
      const r = document.querySelector("[data-timeline-takeover]")?.getBoundingClientRect();
      const inWorkflow = !!r && r.top <= vh * 0.1 && r.bottom >= vh * 0.9;
      const show = y > vh * 0.55 && !inWorkflow;
      if (show !== lastShow) {
        lastShow = show;
        root.dataset.show = show ? "1" : "0";
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
  }, [marks]);

  // clicar/arrastar na linha = levar a agulha até ali
  const seek = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: p * max, behavior: "instant" });
  };
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest(".tc__mark")) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    document.documentElement.classList.add("is-scrubbing");
    seek(e.clientX);
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (dragging.current) seek(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
    document.documentElement.classList.remove("is-scrubbing");
  };

  const cur = marks[current];
  return (
    <div ref={rootRef} className="tc" data-show="0">
      <div className="tc__read" aria-hidden>
        <span className="tc__rec" />
        <span ref={timeRef} className="tc__time">00:00:00:00</span>
        {cur && (
          <span className="tc__sec" key={cur.id}>
            {String(current + 1).padStart(2, "0")} · {cur.label}
          </span>
        )}
      </div>
      <div
        ref={barRef}
        className="tc__bar"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="tc__track" aria-hidden />
        <span className="tc__fill" aria-hidden />
        {marks.map((m, i) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className="tc__mark"
            style={{ left: `${m.at * 100}%` }}
            data-active={i === current || undefined}
            data-edge={m.at > 0.85 ? "end" : m.at < 0.08 ? "start" : undefined}
            aria-label={`Ir para ${m.label}`}
            tabIndex={-1}
          >
            <span className="tc__tip">{m.label}</span>
          </a>
        ))}
        <span className="tc__head" aria-hidden />
      </div>
    </div>
  );
}
