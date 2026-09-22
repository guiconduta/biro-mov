"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Work } from "@/content/home.config";
import { IconClose } from "@/components/icons";
import { nudgeYouTubeQuality, ytEmbedSrc } from "@/lib/youtube";

/** Tela do projeto: player do YouTube (só carrega ao abrir) + ficha. Esc, clique fora e o botão fecham. */
export function ProjectModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => nudgeYouTubeQuality(iframeRef.current), []);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("button, a[href], iframe");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  const vertical = work.aspect === "9:16";

  return createPortal(
    <div className="pm" role="dialog" aria-modal="true" aria-label={work.title} onClick={onClose}>
      <div className="pm__panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="pm__close" onClick={onClose} aria-label="Fechar">
          <IconClose size={18} />
        </button>
        <div className={`pm__player${vertical ? " pm__player--v" : ""}`}>
          <iframe
            ref={iframeRef}
            src={ytEmbedSrc(work.youtubeId!)}
            title={work.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="pm__meta">
          <h3 className="pm__title">{work.title}</h3>
          <p className="pm__info">
            <span>{work.category}</span>
            <span aria-hidden>·</span>
            <span>{work.year}</span>
          </p>
          <p className="pm__roles">{work.roles.join(" · ")}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
