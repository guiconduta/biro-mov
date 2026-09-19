"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Parallax só do Hero: publica --hero-p (0→1) enquanto o Hero sai da tela.
 * O CSS decide o quanto cada camada se mexe. Desligado com prefers-reduced-motion.
 */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      const p = Math.max(0, Math.min(1, window.scrollY / h));
      el.style.setProperty("--hero-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="inicio" className={className} aria-label="Início">
      {children}
    </section>
  );
}
