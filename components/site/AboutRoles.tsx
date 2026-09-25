"use client";

import { useEffect, useRef } from "react";

/**
 * "Rack focus": as funções ficam fora de foco e entram em foco conforme a distância até o
 * ponto de foco. Sem mouse em cima, o foco passeia sozinho de palavra em palavra (autofoco);
 * com mouse, o cursor vira um anel de foco e comanda. Toque numa palavra foca nela.
 * Movimento reduzido: tudo nítido, sem animação.
 */
export function AboutRoles({ roles }: { roles: readonly string[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const ring = ringRef.current;
    if (!list || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = Array.from(list.querySelectorAll<HTMLElement>(".about__word"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let manual = false;
    let index = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let timer = 0;
    let visible = false;

    const centerOf = (el: HTMLElement) => {
      const l = list.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - l.left + r.width / 2, y: r.top - l.top + r.height / 2 };
    };

    const aim = (i: number) => {
      index = i;
      Object.assign(target, centerOf(words[i]));
    };

    const scheduleNext = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!manual) aim((index + 1) % words.length);
        scheduleNext();
      }, 2400);
    };

    const frame = () => {
      // o foco "puxa" devagar entre as palavras, como um foco manual de lente
      const k = manual ? 0.22 : 0.07;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;

      const unit = list.clientWidth / (words.length > 2 && list.clientWidth > 700 ? 4 : 2);
      for (const w of words) {
        const c = centerOf(w);
        const d = Math.hypot(c.x - cur.x, (c.y - cur.y) * 1.6) / unit;
        const blur = Math.min(9, d * 6);
        const sharp = Math.max(0, 1 - d * 1.8);
        w.style.filter = blur < 0.15 ? "none" : `blur(${blur.toFixed(2)}px)`;
        w.style.opacity = String(Math.max(0.35, 1 - d * 0.45));
        w.style.textShadow = sharp > 0 ? `0 0 ${40 * sharp}px rgba(79, 214, 168, ${0.45 * sharp})` : "none";
      }
      if (manual) ring.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(list);

    aim(0);
    Object.assign(cur, target);
    scheduleNext();

    const nearest = (x: number, y: number) => {
      let best = 0;
      let bd = Infinity;
      words.forEach((w, i) => {
        const c = centerOf(w);
        const d = Math.hypot(c.x - x, c.y - y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !fine) return;
      const l = list.getBoundingClientRect();
      manual = true;
      list.dataset.manual = "true";
      target.x = e.clientX - l.left;
      target.y = e.clientY - l.top;
    };
    const onLeave = () => {
      if (!manual) return;
      manual = false;
      delete list.dataset.manual;
      aim(nearest(cur.x, cur.y));
      scheduleNext();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const l = list.getBoundingClientRect();
      aim(nearest(e.clientX - l.left, e.clientY - l.top));
      scheduleNext();
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    list.addEventListener("pointerdown", onDown);
    return () => {
      stop();
      io.disconnect();
      window.clearTimeout(timer);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      list.removeEventListener("pointerdown", onDown);
    };
  }, [roles]);

  return (
    <div ref={listRef} className="about__roles-box">
      <ul className="about__roles" aria-label="Atuação">
        {roles.map((r) => (
          <li key={r}>
            <span className="about__word">{r}</span>
          </li>
        ))}
      </ul>
      <span ref={ringRef} className="about__ring" aria-hidden>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M50 0v10M50 90v10M0 50h10M90 50h10" stroke="currentColor" strokeWidth="1" />
          <path d="M22 30V22h8M78 30V22h-8M22 70v8h8M78 70v8h-8" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="1.8" fill="#4fd6a8" />
        </svg>
      </span>
    </div>
  );
}
