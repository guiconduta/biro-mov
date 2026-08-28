"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  // ---- estado nos query params (filtros) + hash (vídeo aberto) ----
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setCat(p.get("cat") ?? "");
    setFmt(p.get("fmt") ?? "");
    setClient(p.get("client") ?? "");
    const h = window.location.hash.replace("#", "");
    if (h && videos.some((v) => v.id === h)) setOpenId(h);
  }, [videos]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (cat) p.set("cat", cat);
    if (fmt) p.set("fmt", fmt);
    if (client) p.set("client", client);
    const qs = p.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    window.history.replaceState(null, "", url);
  }, [cat, fmt, client]);

  const filtered = videos.filter(
    (v) =>
      (!cat || v.category === cat) &&
      (!fmt || v.format === fmt) &&
      (!client || v.clientId === client),
  );

  const open = openId ? videos.find((v) => v.id === openId) : null;

  // ---- modal: foco, trap, restauração ----
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setOpenId(null);
    const p = new URLSearchParams(window.location.search);
    window.history.replaceState(null, "", window.location.pathname + (p.toString() ? `?${p}` : ""));
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (f.length === 0) return;
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
      document.body.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, [open, closeModal]);

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

      <p className="work-count" aria-live="polite">
        {filtered.length} vídeo{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="work-grid">
        {filtered.map((v) => (
          <button
            key={v.id}
            className="wcard"
            onClick={() => {
              setOpenId(v.id);
              window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${v.id}`);
            }}
            aria-label={v.title}
          >
            <span className="wcard__thumb">
              <img
                src={v.poster || `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                width={360}
                height={640}
              />
            </span>
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal__inner">
            <button className="modal__close" ref={closeRef} onClick={closeModal} aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className={open.format === "16:9" ? "modal__player modal__player--wide" : "modal__player"}>
              <LiteYouTube id={open.youtubeId} title={open.title} poster={open.poster} />
            </div>
            <div className="modal__meta">
              {open.clientId && <span className="eyebrow">{clientName.get(open.clientId)}</span>}
              <h2 id="work-modal-title">{open.title}</h2>
              <div className="modal__tags">
                {open.role.map((r) => (
                  <span key={r} className="tag">{r}</span>
                ))}
              </div>
              <Link href={open.url} target="_blank" rel="noopener noreferrer" className="link-accent">
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
    <div className="filter-row" role="group" aria-label={label}>
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
    <button
      type="button"
      className={"chip" + (active ? " chip--on" : "")}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
