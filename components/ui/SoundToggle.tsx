"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/sound";

const INTERACTIVE = "a, button, [data-sound]";

/**
 * Botão "Som" do menu. Desligado por padrão. Ligado, o site ganha tiques nos botões, um sopro
 * na troca de seção e o ambiente de sala — os sons em si ficam em lib/sound.ts.
 * Se o visitante deixou ligado da última vez, o som volta no primeiro clique dele na página
 * (antes disso o navegador não deixa tocar nada).
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => sound.subscribe(setOn), []);

  useEffect(() => {
    if (!sound.remembered()) return;
    setPending(true);
    const wake = (e: Event) => {
      // clique no próprio botão: quem decide é ele (senão ligaria aqui e desligaria lá)
      if ((e.target as Element).closest?.(".sound")) return stop();
      stop();
      setPending(false);
      if (!sound.enabled) sound.setEnabled(true, true);
    };
    const stop = () => {
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
    };
    window.addEventListener("pointerdown", wake);
    window.addEventListener("keydown", wake);
    return stop;
  }, []);

  // tique ao passar por qualquer coisa clicável, clique ao apertar
  useEffect(() => {
    let last: Element | null = null;
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element).closest?.(INTERACTIVE) ?? null;
      if (el && el !== last) sound.play("tick");
      last = el;
    };
    const down = (e: PointerEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE)) sound.play("click");
    };
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
    };
  }, []);

  const lit = on || pending;
  return (
    <button
      type="button"
      className="sound"
      data-on={lit || undefined}
      aria-pressed={on}
      aria-label={on ? "Desligar som do site" : "Ligar som do site"}
      onClick={() => {
        setPending(false);
        sound.setEnabled(!sound.enabled);
      }}
    >
      <span className="sound__eq" aria-hidden>
        <i /> <i /> <i /> <i />
      </span>
      <span className="sound__label">Som</span>
    </button>
  );
}
