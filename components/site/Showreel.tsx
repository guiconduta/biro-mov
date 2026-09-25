"use client";

import { useEffect, useRef, useState } from "react";
import type { ShowreelConfig } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { IconPlay } from "@/components/icons";
import { MeshBackdrop } from "@/components/ui/MeshBackdrop";
import { nudgeYouTubeQuality, ytEmbedSrc } from "@/lib/youtube";

function Player({ cfg, title }: { cfg: ShowreelConfig; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (cfg.provider === "youtube") return nudgeYouTubeQuality(iframeRef.current);
  }, [cfg.provider]);

  if (cfg.provider === "vimeo") {
    return (
      <iframe
        className="showreel__media"
        src={`https://player.vimeo.com/video/${cfg.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (cfg.provider === "youtube") {
    return (
      <iframe
        ref={iframeRef}
        className="showreel__media"
        src={ytEmbedSrc(cfg.youtubeId)}
        title={title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    // O áudio só existe depois do clique: este <video> só é montado no play.
    <video
      className="showreel__media"
      src={cfg.videoUrl}
      poster={cfg.poster || undefined}
      controls
      autoPlay
      playsInline
      preload="auto"
    />
  );
}

export function Showreel({ config }: { config: ShowreelConfig }) {
  const hasVideo =
    (config.provider === "file" && !!config.videoUrl) ||
    (config.provider === "vimeo" && !!config.vimeoId) ||
    (config.provider === "youtube" && !!config.youtubeId);

  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    setCanHover(mq.matches);
  }, []);

  const showPreview = hasVideo && !!config.previewUrl && canHover && hover && !playing;

  return (
    <section id="showreel" className="showreel" aria-labelledby="showreel-label">
      <Reveal>
        <div className="showreel__head">
          <h2 id="showreel-label" className="label">SHOWREEL</h2>
        </div>
      </Reveal>

      <Reveal delay={120}>
        {hasVideo ? (
          <div
            className="showreel__frame"
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
            onPointerLeave={() => setHover(false)}
          >
            {playing ? (
              <Player cfg={config} title="Showreel BIRO.mov" />
            ) : (
              <>
                {config.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="showreel__poster" src={config.poster} alt="" loading="lazy" width={1920} height={1080} />
                ) : (
                  <div className="showreel__placeholder" aria-hidden />
                )}
                {showPreview && (
                  <video className="showreel__preview" src={config.previewUrl} muted loop playsInline autoPlay preload="none" />
                )}
                <button type="button" className="showreel__play" onClick={() => setPlaying(true)} aria-label="Reproduzir showreel">
                  <IconPlay size={26} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="showreel__frame showreel__frame--empty" role="img" aria-label="Espaço reservado para o showreel (vídeo ainda não adicionado)">
            {/* TESTE: mesh gradient enquanto o showreel não chega */}
            <MeshBackdrop intensity="vivid" radius="28px" style={{ position: "absolute", inset: 0 }} />
            <span className="showreel__play showreel__play--off" aria-hidden>
              <IconPlay size={26} />
            </span>
          </div>
        )}
      </Reveal>
    </section>
  );
}
