"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Mode = "rise" | "mask" | "wipe" | "words" | "list";

/**
 * Entrada no scroll, por movimento (o CSS de cada modo está em home.css):
 * rise = sobe e aparece · mask = sobe de dentro de uma máscara (títulos) · wipe = a imagem é
 * descoberta de baixo para cima · words = palavra por palavra (os filhos trazem .w) ·
 * list = os <li> deslizam um a um. O servidor renderiza VISÍVEL; só depois da
 * hidratação o que está abaixo da dobra é escondido e revelado ao entrar na tela.
 * Sem JS ou com prefers-reduced-motion, o conteúdo simplesmente aparece.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  mode = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: Mode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"ssr" | "hidden" | "in">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("in");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setState("in");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${mode} ${className}`.trim()}
      data-reveal={state}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {mode === "mask" || mode === "wipe" ? <div className="reveal__in">{children}</div> : children}
    </div>
  );
}
