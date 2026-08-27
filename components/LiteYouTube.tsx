"use client";

import { useState } from "react";

/**
 * Facade do YouTube: mostra o poster primeiro; o iframe só entra no play.
 * Atende o requisito de performance (nenhum iframe no HTML inicial) e
 * usa youtube-nocookie. Wrapper de proporção fica com quem chama.
 */
export function LiteYouTube({
  id,
  title,
  poster,
  className,
}: {
  id: string;
  title: string;
  poster?: string | null;
  className?: string;
}) {
  const [play, setPlay] = useState(false);
  const thumb = poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (play) {
    return (
      <iframe
        className={className}
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className={className}
      aria-label={`Reproduzir: ${title}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 0,
        border: 0,
        cursor: "pointer",
        background: `#050d0a center/cover no-repeat url("${thumb}")`,
        display: "block",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,13,10,.1), rgba(5,13,10,.5))",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "1.5px solid rgba(167,246,197,.7)",
          background: "rgba(5,13,10,.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            width: 0,
            height: 0,
            marginLeft: 5,
            borderLeft: "17px solid #9fcbb4",
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
          }}
        />
      </span>
    </button>
  );
}
