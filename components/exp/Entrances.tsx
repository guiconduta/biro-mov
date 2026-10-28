"use client";

import { useEffect } from "react";

/**
 * Entrada das partes de cada seção (título, texto, imagem), uma vez, ao entrar na tela.
 * Sem script ou com movimento reduzido o conteúdo já está visível: o estado escondido só
 * existe depois que este efeito marca o <html> com data-x-motion.
 */
export function Entrances() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-in]"));
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.92) el.dataset.in = "wait";
    });
    document.documentElement.dataset.xMotion = "1";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const sibs = el.parentElement ? Array.from(el.parentElement.querySelectorAll(":scope > [data-in]")) : [];
          el.style.transitionDelay = `${Math.max(0, sibs.indexOf(el)) * 75}ms`;
          el.dataset.in = "go";
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => el.dataset.in === "wait" && io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
