"use client";

import { useEffect, useRef, useState } from "react";
import type { Frame } from "./data";
import { ProjectModal } from "@/components/site/ProjectModal";
import type { Work } from "@/content/home.config";

/**
 * Faixa de quadros do topo: rola de lado (dedo, trackpad, arrastar ou setas), o quadro mais perto
 * do centro acende e mostra o título. Clicar abre o vídeo. Nunca sequestra a rolagem vertical.
 */
export function Strip({ frames }: { frames: Frame[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = row.getBoundingClientRect().left + row.clientWidth / 2;
      let best = 0;
      let bd = Infinity;
      row.querySelectorAll<HTMLElement>("[data-i]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bd) {
          bd = d;
          best = Number(el.dataset.i);
        }
      });
      setLit(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // arrastar com o mouse (no toque o navegador já rola sozinho)
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = row.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 4) {
        moved = true;
        row.dataset.drag = "1";
      }
      row.scrollLeft = s0 - dx;
    };
    const onUp = () => {
      down = false;
      delete row.dataset.drag;
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    row.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    row.addEventListener("click", onClick, true);
    return () => {
      row.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      row.removeEventListener("click", onClick, true);
    };
  }, []);

  const step = (dir: number) => {
    const row = rowRef.current;
    const el = row?.querySelector<HTMLElement>(`[data-i="${Math.max(0, Math.min(frames.length - 1, lit + dir))}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const cur = frames[lit];
  return (
    <div className="x-strip">
      <div
        ref={rowRef}
        className="x-strip__row"
        tabIndex={0}
        aria-label="Quadros dos trabalhos"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        {frames.map((f, i) => (
          <button
            key={f.key}
            type="button"
            data-i={i}
            className="x-strip__frame"
            data-lit={i === lit ? "1" : undefined}
            style={{ aspectRatio: `${f.w} / ${f.h}` }}
            onClick={() => setOpen(f.work)}
            aria-label={`Assistir: ${f.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt="" width={f.w * 40} height={f.h * 40} loading={i < 8 ? "eager" : "lazy"} draggable={false} />
          </button>
        ))}
      </div>
      <p className="x-strip__title" aria-live="polite">
        {cur?.title}
      </p>
      {open && <ProjectModal work={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
