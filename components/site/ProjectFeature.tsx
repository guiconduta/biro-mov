"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import type { Work } from "@/content/home.config";
import { COPY } from "@/content/home.config";
import { ProjectModal } from "@/components/site/ProjectModal";
import { IconPlay } from "@/components/icons";

type Variant = "wide" | "asym" | "full";

/** Quadros do scrub: os exportados pelo autor ou, na falta, os 3 que o YouTube gera (25%, 50%, 75%). */
function scrubFrames(work: Work): string[] {
  if (work.frames?.length) return work.frames;
  if (work.youtubeId) return [1, 2, 3].map((n) => `https://i.ytimg.com/vi/${work.youtubeId}/maxres${n}.jpg`);
  return [];
}

function Wrapper({ href, className, children, onOpen }: { href: string; className: string; children: ReactNode; onOpen?: () => void }) {
  if (onOpen) {
    return (
      <button type="button" className={className} onClick={onOpen} aria-haspopup="dialog">
        {children}
      </button>
    );
  }
  if (!href) return <div className={className}>{children}</div>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Linha de ficha técnica em rótulo + valor (o "Industry / Style / Tone / Format" da referência). */
function MetaRow({ work, n }: { work: Work; n: string }) {
  return (
    <dl className="pf__row">
      <div>
        <dt>Nº</dt>
        <dd>{n}</dd>
      </div>
      <div>
        <dt>Categoria</dt>
        <dd>{work.category}</dd>
      </div>
      <div>
        <dt>Ano</dt>
        <dd>{work.year}</dd>
      </div>
      <div>
        <dt>Função</dt>
        <dd>{work.roles.join(" · ")}</dd>
      </div>
    </dl>
  );
}

export function ProjectFeature({ work, index, variant }: { work: Work; index: number; variant: Variant }) {
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  // scrub: a posição do mouse no card escolhe o quadro, como arrastar a agulha na timeline
  const [armed, setArmed] = useState(false);
  const [frame, setFrame] = useState(-1);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches);
  }, []);

  const n = String(index + 1).padStart(2, "0");
  const frames = scrubFrames(work);
  const scrub = canHover && frames.length > 0;
  const preview = !scrub && canHover && hover && !!work.videoPreview;

  const onScrub = (e: RPointerEvent<HTMLDivElement>) => {
    if (!scrub || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(0.9999, Math.max(0, (e.clientX - r.left) / r.width));
    e.currentTarget.style.setProperty("--sx", x.toFixed(4));
    const i = Math.floor(x * frames.length);
    if (i !== frame) setFrame(i);
  };
  const sizes =
    variant === "full" ? "100vw" : variant === "asym" ? "(min-width: 900px) 52vw, 100vw" : "(min-width: 900px) 84vw, 100vw";

  const media = (
    <Wrapper href={work.projectUrl} className="pf__media-link" onOpen={work.youtubeId ? () => setOpen(true) : undefined}>
      <div
        className="pf__media"
        data-scrub={scrub && frame !== -1 ? "" : undefined}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          setHover(true);
          if (scrub) setArmed(true);
          onScrub(e);
        }}
        onPointerMove={onScrub}
        onPointerLeave={() => {
          setHover(false);
          setFrame(-1);
        }}
      >
        {work.poster ? (
          <Image src={work.poster} alt={`${work.title} — ${work.category}`} fill sizes={sizes} className="pf__img" />
        ) : (
          <div className="pf__placeholder" aria-hidden>
            <span>{n}</span>
          </div>
        )}
        {scrub && armed && (
          // montados no primeiro hover e mantidos: trocar de quadro é só trocar a opacidade (sem piscar)
          <div className="pf__frames" aria-hidden>
            {frames.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" decoding="async" data-on={i === frame || undefined} />
            ))}
          </div>
        )}
        {scrub && (
          <span className="pf__scrub" aria-hidden>
            {frames.map((_, i) => (
              <i key={i} style={{ left: `${(i / frames.length) * 100}%` }} />
            ))}
          </span>
        )}
        {preview && <video className="pf__video" src={work.videoPreview} muted loop playsInline autoPlay preload="none" />}
        <div className="pf__shade" aria-hidden />
        <span className="pf__badge" aria-hidden>{n}</span>
        {work.youtubeId && (
          <span className="pf__yt" aria-hidden>
            <IconPlay size={11} />
            YouTube
          </span>
        )}
        {(work.projectUrl || work.youtubeId) && <span className="pf__cta">{COPY.seeProject}</span>}
      </div>
    </Wrapper>
  );

  return (
    <article className={`pf pf--${variant}`}>
      {variant === "wide" ? (
        // caixa única: mídia e ficha coladas, como um só cartão
        <div className="pf__card">
          {media}
          <div className="pf__meta">
            <h3 className="pf__title">{work.title}</h3>
            {work.description ? (
              <p className="pf__desc">{work.description}</p>
            ) : (
              <p className="pf__desc todo">[DESCRIÇÃO DO PROJETO]</p>
            )}
            <MetaRow work={work} n={n} />
          </div>
        </div>
      ) : (
        <>
          {media}
          <div className="pf__meta">
            <h3 className="pf__title">{work.title}</h3>
            {work.description ? (
              <p className="pf__desc">{work.description}</p>
            ) : (
              <p className="pf__desc todo">[DESCRIÇÃO DO PROJETO]</p>
            )}
            <MetaRow work={work} n={n} />
          </div>
        </>
      )}
      {open && work.youtubeId && <ProjectModal work={work} onClose={close} />}
    </article>
  );
}
