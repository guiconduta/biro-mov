"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { PublicVideo, Category } from "@/lib/types";
import { LiteYouTube } from "@/components/LiteYouTube";

type ClientLite = { id: string; name: string };

const FORMATS = [
  ["Todos", ""],
  ["9:16", "9:16"],
  ["16:9", "16:9"],
] as const;

export function WorkBrowser({
  videos,
  categories,
  clients,
}: {
  videos: PublicVideo[];
  categories: Category[];
  clients: ClientLite[];
}) {
  const [cat, setCat] = useState("");
  const [fmt, setFmt] = useState("");
  const [client, setClient] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const clientName = useMemo(
    () => new Map(clients.map((c) => [c.id, c.name])),
    [clients],
  );

  // deep link /work#v29
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && videos.some((v) => v.id === h)) setOpenId(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [videos]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = videos.filter(
    (v) =>
      (!cat || v.category === cat) &&
      (!fmt || v.format === fmt) &&
      (!client || v.clientId === client),
  );

  const open = openId ? videos.find((v) => v.id === openId) : null;

  return (
    <>
      <div className="work-filters">
        <FilterRow label="Categoria">
          <Chip active={!cat} onClick={() => setCat("")}>Todas</Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Formato">
          {FORMATS.map(([label, val]) => (
            <Chip key={label} active={fmt === val} onClick={() => setFmt(val)}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Cliente">
          <Chip active={!client} onClick={() => setClient("")}>Todos</Chip>
          {clients.map((c) => (
            <Chip key={c.id} active={client === c.id} onClick={() => setClient(c.id)}>
              {c.name}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <p className="work-count">{filtered.length} vídeo{filtered.length === 1 ? "" : "s"}</p>

      <div className="work-grid">
        {filtered.map((v) => (
          <button
            key={v.id}
            className="wcard"
            onClick={() => {
              setOpenId(v.id);
              history.replaceState(null, "", `#${v.id}`);
            }}
            aria-label={v.title}
          >
            <span
              className="wcard__thumb"
              style={{
                backgroundImage: `url("${v.poster || `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}")`,
              }}
            />
            <span className="wcard__play" aria-hidden><i /></span>
            <span className="wcard__meta">
              {v.clientId && <span className="wcard__client">{clientName.get(v.clientId)}</span>}
              <span className="wcard__title">{v.title}</span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpenId(null);
              history.replaceState(null, "", window.location.pathname);
            }
          }}
        >
          <div className="modal__inner">
            <button
              className="modal__close"
              onClick={() => {
                setOpenId(null);
                history.replaceState(null, "", window.location.pathname);
              }}
              aria-label="Fechar"
            >
              ✕
            </button>
            <div className={open.format === "16:9" ? "modal__player modal__player--wide" : "modal__player"}>
              <LiteYouTube id={open.youtubeId} title={open.title} poster={open.poster} />
            </div>
            <div className="modal__meta">
              {open.clientId && <span className="eyebrow">{clientName.get(open.clientId)}</span>}
              <h2>{open.title}</h2>
              <div className="modal__tags">
                {open.role.map((r) => (
                  <span key={r} className="tag">{r}</span>
                ))}
              </div>
              <Link href={open.url} target="_blank" rel="noopener" className="link-accent">
                ABRIR NO YOUTUBE →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="filter-row">
      <span className="filter-row__label">{label}</span>
      <div className="filter-row__chips">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className={"chip" + (active ? " chip--on" : "")} onClick={onClick} type="button">
      {children}
    </button>
  );
}
