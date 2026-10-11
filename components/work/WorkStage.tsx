"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from "react";
import type { Category, PublicVideo } from "@/lib/types";
import { IconArrow, IconPlay } from "@/components/icons";
import { nudgeYouTubeQuality, ytEmbedSrc } from "@/lib/youtube";

type ClientLite = { id: string; name: string };

const pad = (n: number) => String(n).padStart(2, "0");
const duration = (s: number) => `${Math.floor(s / 60)}:${pad(s % 60)}`;

/**
 * Capas possíveis do card, da melhor para a pior: a própria; o quadro vertical em alta que o YouTube
 * guarda dos Shorts (oar2); e as capas comuns. Nem todo vídeo tem todas — quando uma falta, o YouTube
 * devolve um cinza de 120px em vez de erro, então quem decide é o tamanho da imagem que chegou.
 */
function covers(v: PublicVideo) {
  const yt = (name: string) => `https://i.ytimg.com/vi/${v.youtubeId}/${name}.jpg`;
  const list = [yt("oar2"), yt("maxresdefault"), yt("sddefault"), v.thumbnail];
  return v.poster ? [v.poster, ...list] : list;
}

function nextCover(img: HTMLImageElement, list: string[]) {
  const at = Number(img.dataset.at ?? 0) + 1;
  if (at >= list.length) return;
  img.dataset.at = String(at);
  img.src = list[at];
}

/** Onde cada card fica no espaço, pela distância até o card do centro (em larguras de card). */
function place(o: number) {
  const a = Math.abs(o);
  const s = Math.sign(o);
  if (a === 0) return { x: 0, z: 0, ry: 0, sc: 1, op: 1 };
  if (a === 1) return { x: s * 1.02, z: -190, ry: -s * 38, sc: 0.86, op: 1 };
  if (a === 2) return { x: s * 1.7, z: -400, ry: -s * 46, sc: 0.78, op: 0.42 };
  return { x: s * 2.2, z: -600, ry: -s * 50, sc: 0.7, op: 0 };
}

/**
 * Biblioteca em "palco 3D" (só vídeos em pé, 9:16 — quem filtra é a página): os vídeos são cartões
 * flutuando em perspectiva. O do centro é o da vez;
 * setas, teclado (← →), arrastar ou clicar num cartão ao lado trocam de vídeo. Clicar no do centro
 * dá play ali mesmo. As categorias no topo trocam a fila inteira.
 */
export function WorkStage({
  videos,
  categories,
  clients,
}: {
  videos: PublicVideo[];
  categories: Category[];
  clients: ClientLite[];
}) {
  const [cat, setCat] = useState("");
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rigRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const seen = useRef(new Set<string>());
  const drag = useRef({ on: false, x: 0, moved: false });

  const clientName = useMemo(() => new Map(clients.map((c) => [c.id, c.name])), [clients]);
  const catLabel = useMemo(() => new Map(categories.map((c) => [c.id, c.label])), [categories]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    videos.forEach((v) => m.set(v.category, (m.get(v.category) ?? 0) + 1));
    return m;
  }, [videos]);

  const list = useMemo(() => (cat ? videos.filter((v) => v.category === cat) : videos), [videos, cat]);
  const n = list.length;
  const cur = list[Math.min(idx, n - 1)];

  const go = useCallback(
    (to: number) => {
      setPlaying(false);
      setIdx(Math.max(0, Math.min(n - 1, to)));
    },
    [n],
  );

  const pickCat = (id: string) => {
    setPlaying(false);
    setCat(id);
    setIdx(0);
  };

  // link compartilhável: ?cat= guarda a categoria, #id guarda o vídeo
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat") ?? "";
    const h = window.location.hash.slice(1);
    const hit = videos.find((v) => v.id === h);
    const useCat = hit && c && hit.category !== c ? "" : c;
    if (useCat && videos.some((v) => v.category === useCat)) setCat(useCat);
    if (hit) setIdx((useCat ? videos.filter((v) => v.category === useCat) : videos).indexOf(hit));
  }, [videos]);

  useEffect(() => {
    if (!cur) return;
    window.history.replaceState(null, "", `${window.location.pathname}${cat ? `?cat=${cat}` : ""}#${cur.id}`);
  }, [cat, cur]);

  useEffect(() => {
    if (playing) return nudgeYouTubeQuality(iframeRef.current);
  }, [playing, cur]);

  // teclado: ← → trocam de vídeo, Esc para o play
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") go(idx + 1);
      else if (e.key === "ArrowLeft") go(idx - 1);
      else if (e.key === "Escape") setPlaying(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, idx]);

  // o palco inclina de leve acompanhando o mouse (só com mouse e sem "reduzir movimento")
  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.07;
      pos.y += (target.y - pos.y) * 0.07;
      rig.style.transform = `rotateY(${(pos.x * 5).toFixed(3)}deg) rotateX(${(-pos.y * 3.5).toFixed(3)}deg)`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // arrastar o palco para o lado troca de vídeo
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    drag.current = { on: true, x: e.clientX, moved: false };
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (drag.current.on && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
  };
  const onUp = (e: RPointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    drag.current.on = false;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1));
  };

  if (!cur) return null;

  const from = Math.max(0, Math.min(idx - 2, n - 5));
  const around = list.slice(from, from + 5);

  return (
    <div className="wk">
      <div className="wk__head">
        <h1 className="label">TRABALHOS</h1>
        <div className="wk__cats" role="group" aria-label="Categoria">
          <button type="button" className="chip" aria-pressed={!cat} onClick={() => pickCat("")}>
            Todas <span>{videos.length}</span>
          </button>
          {categories
            .filter((c) => counts.has(c.id))
            .map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => pickCat(c.id)}>
                {c.label} <span>{counts.get(c.id)}</span>
              </button>
            ))}
        </div>
      </div>

      <div className="wk__stage" data-playing={playing || undefined}>
        <div className="wk__glow" aria-hidden />

        {/* painel flutuante esquerdo: a fila */}
        <aside className="wk__panel wk__panel--list" aria-label="Fila de vídeos">
          <p className="wk__counter">
            <b>{pad(idx + 1)}</b>
            <span>/ {pad(n)}</span>
          </p>
          <ol className="wk__queue">
            {around.map((v, i) => {
              const at = from + i;
              return (
                <li key={v.id}>
                  <button type="button" aria-current={at === idx || undefined} onClick={() => go(at)}>
                    <span>{pad(at + 1)}</span>
                    <span>{v.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* cartões em perspectiva */}
        <div
          className="wk__scene"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Vídeos"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => (drag.current.on = false)}
        >
          <div ref={rigRef} className="wk__rig">
            {list.map((v, i) => {
              const o = Math.max(-3, Math.min(3, i - idx));
              const a = Math.abs(o);
              const p = place(o);
              if (Math.abs(i - idx) <= 3) seen.current.add(v.id);
              const style = {
                transform: `translate3d(calc(var(--cw) * ${p.x}), 0, ${p.z}px) rotateY(${p.ry}deg) scale(${p.sc})`,
                opacity: p.op,
                zIndex: 10 - a,
                "--d": `${(i % 5) * -1.3}s`,
              } as CSSProperties;
              const isCur = o === 0;
              return (
                <div
                  key={v.id}
                  className="wk__card"
                  data-pos={a}
                  style={style}
                  aria-hidden={a > 2 || undefined}
                >
                  <div className="wk__card-in">
                    {isCur && playing ? (
                      <iframe
                        ref={iframeRef}
                        src={ytEmbedSrc(v.youtubeId)}
                        title={v.title}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className="wk__card-btn"
                        tabIndex={a > 2 ? -1 : 0}
                        aria-label={isCur ? `Reproduzir: ${v.title}` : `Ir para: ${v.title}`}
                        onClick={() => {
                          if (drag.current.moved) return;
                          if (isCur) setPlaying(true);
                          else go(i);
                        }}
                      >
                        {seen.current.has(v.id) && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={covers(v)[0]}
                            alt=""
                            draggable={false}
                            decoding="async"
                            ref={(el) => {
                              // imagem que terminou de carregar antes do React assumir a página: onLoad não dispara
                              if (el?.complete && el.naturalWidth <= 120) nextCover(el, covers(v));
                            }}
                            onError={(e) => nextCover(e.currentTarget, covers(v))}
                            onLoad={(e) => {
                              if (e.currentTarget.naturalWidth <= 120) nextCover(e.currentTarget, covers(v));
                            }}
                          />
                        )}
                        <span className="wk__card-shade" aria-hidden />
                        <span className="wk__card-n" aria-hidden>{pad(i + 1)}</span>
                        <span className="wk__card-play" aria-hidden>
                          <IconPlay size={20} />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* painel flutuante direito: ficha do vídeo da vez */}
        <aside className="wk__panel wk__panel--info" aria-live="polite">
          {cur.clientId && clientName.get(cur.clientId) && <p className="wk__client">{clientName.get(cur.clientId)}</p>}
          <h2 className="wk__title" key={cur.id}>{cur.title}</h2>
          <dl className="wk__facts">
            <div>
              <dt>Categoria</dt>
              <dd>{catLabel.get(cur.category) ?? cur.category}</dd>
            </div>
            {cur.role.length > 0 && (
              <div>
                <dt>Função</dt>
                <dd>{cur.role.join(" · ")}</dd>
              </div>
            )}
            {cur.durationSec > 0 && (
              <div>
                <dt>Duração</dt>
                <dd>{duration(cur.durationSec)}</dd>
              </div>
            )}
            <div>
              <dt>Formato</dt>
              <dd>{cur.format}</dd>
            </div>
          </dl>
          <a href={cur.url} target="_blank" rel="noopener noreferrer" className="wk__yt">
            Abrir no YouTube
            <IconArrow size={14} />
          </a>
        </aside>
      </div>

      {/* controles: setas + régua para pular direto */}
      <div className="wk__bar">
        <button type="button" className="wk__nav wk__nav--prev" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Vídeo anterior">
          <IconArrow size={18} />
        </button>
        <span className="wk__bar-n" aria-hidden>
          {pad(idx + 1)} / {pad(n)}
        </span>
        <input
          className="wk__range"
          type="range"
          min={1}
          max={n}
          value={idx + 1}
          onChange={(e) => go(Number(e.target.value) - 1)}
          aria-label="Posição na fila de vídeos"
          style={{ "--f": n > 1 ? idx / (n - 1) : 0 } as CSSProperties}
        />
        <button type="button" className="wk__nav" onClick={() => go(idx + 1)} disabled={idx >= n - 1} aria-label="Próximo vídeo">
          <IconArrow size={18} />
        </button>
      </div>
    </div>
  );
}
