"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { Work } from "@/content/home.config";
import { COPY } from "@/content/home.config";

type Variant = "wide" | "asym" | "full";

function Wrapper({ href, className, children }: { href: string; className: string; children: ReactNode }) {
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

export function ProjectFeature({ work, index, variant }: { work: Work; index: number; variant: Variant }) {
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches);
  }, []);

  const n = String(index + 1).padStart(2, "0");
  const preview = canHover && hover && !!work.videoPreview;
  const sizes =
    variant === "full" ? "100vw" : variant === "asym" ? "(min-width: 900px) 52vw, 100vw" : "(min-width: 900px) 84vw, 100vw";

  return (
    <article className={`pf pf--${variant}`}>
      <Wrapper href={work.projectUrl} className="pf__media-link">
        <div
          className="pf__media"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          {work.poster ? (
            <Image src={work.poster} alt={`${work.title} — ${work.category}`} fill sizes={sizes} className="pf__img" />
          ) : (
            <div className="pf__placeholder" aria-hidden>
              <span>{n}</span>
            </div>
          )}
          {preview && <video className="pf__video" src={work.videoPreview} muted loop playsInline autoPlay preload="none" />}
          <div className="pf__shade" aria-hidden />
          {work.projectUrl && <span className="pf__cta">{COPY.seeProject}</span>}
        </div>
      </Wrapper>

      <div className="pf__meta">
        <span className="pf__n" aria-hidden>{n}</span>
        <h3 className="pf__title">{work.title}</h3>
        <p className="pf__info">
          <span>{work.category}</span>
          <span aria-hidden>·</span>
          <span>{work.year}</span>
        </p>
        <p className="pf__roles">{work.roles.join(" · ")}</p>
      </div>
    </article>
  );
}
