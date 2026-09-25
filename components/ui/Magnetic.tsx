"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Botão "elástico": ao passar o mouse ele agarra o cursor e é arrastado junto, esticando na
 * direção do puxão e ficando cada vez mais duro (como uma corda tensionada). Se o cursor vai
 * longe demais, a corda estoura: o botão volta balançando (mola pouco amortecida) com uma
 * tremidinha que some aos poucos. Só com mouse e sem prefers-reduced-motion.
 *
 * Estrutura: o span externo fica parado (é a referência de posição); só o interno se move.
 */
export function Magnetic({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const MAX = 48; // quanto o botão consegue ir atrás do cursor (px)
    const REACH = 120; // distância em que a corda já está bem esticada
    const SNAP_EXTRA = 150; // além da borda do botão: aqui a corda estoura

    let grabbing = false;
    let snapAt = 0; // instante do estouro (para a tremidinha)
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;

    const center = () => {
      const r = outer.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
    };

    const tick = (t: number) => {
      // segurando: segue suave · solto: mola frouxa que passa do ponto e volta (wiggle)
      const k = grabbing ? 0.22 : 0.13;
      const friction = grabbing ? 0.62 : 0.84;
      vel.x = vel.x * friction + (target.x - pos.x) * k;
      vel.y = vel.y * friction + (target.y - pos.y) * k;
      pos.x += vel.x;
      pos.y += vel.y;

      const d = Math.hypot(pos.x, pos.y);
      const angle = Math.atan2(pos.y, pos.x);
      const stretch = 1 + 0.12 * Math.min(1, d / MAX); // estica na direção do puxão
      const since = (t - snapAt) / 1000;
      const shake = snapAt && since < 0.9 ? 5 * Math.exp(-since * 5) * Math.sin(since * 55) : 0; // graus

      inner.style.transform =
        `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) ` +
        `rotate(${angle}rad) scaleX(${stretch.toFixed(4)}) scaleY(${(2 - stretch).toFixed(4)}) rotate(${-angle}rad) ` +
        `rotate(${shake.toFixed(2)}deg)`;

      const settled = !grabbing && d < 0.05 && Math.hypot(vel.x, vel.y) < 0.05 && shake === 0;
      if (settled) {
        inner.style.transform = "";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const release = () => {
      grabbing = false;
      target.x = 0;
      target.y = 0;
      snapAt = performance.now();
      run();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const c = center();
      const dx = e.clientX - c.x;
      const dy = e.clientY - c.y;
      const dist = Math.hypot(dx, dy);
      const inside = Math.abs(dx) <= c.w / 2 + 8 && Math.abs(dy) <= c.h / 2 + 8;

      if (!grabbing && inside) grabbing = true;
      if (!grabbing) return;

      if (dist > Math.max(c.w, c.h) / 2 + SNAP_EXTRA) {
        release(); // a corda estoura
        return;
      }
      // quanto mais longe, mais difícil puxar: tende a MAX sem nunca passar
      const pull = MAX * Math.tanh(dist / REACH);
      target.x = dist ? (dx / dist) * pull : 0;
      target.y = dist ? (dy / dist) * pull : 0;
      run();
    };
    const onOut = (e: PointerEvent) => {
      if (grabbing && !e.relatedTarget) release(); // o cursor saiu da janela
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <span ref={outerRef} className="magnetic">
      <span ref={innerRef} className="magnetic__inner">
        {children}
      </span>
    </span>
  );
}
