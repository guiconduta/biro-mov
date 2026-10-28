"use client";

import { useState } from "react";
import type { Run } from "./data";
import { ProjectModal } from "@/components/site/ProjectModal";
import type { Work } from "@/content/home.config";

/**
 * A folha de contato: cada projeto é uma sequência de quadros em fila, precedida do nome.
 * Passar o mouse (ou focar) numa sequência apaga as outras e mostra a ficha dela num lugar fixo.
 */
export function Sheet({ runs, size = "lg" }: { runs: Run[]; size?: "lg" | "sm" }) {
  const [hot, setHot] = useState<string | null>(null);
  const [open, setOpen] = useState<Work | null>(null);
  const cur = runs.find((r) => r.id === hot);

  return (
    <div className="x-sheet" data-size={size} data-hot={hot ? "1" : undefined}>
      <div className="x-sheet__runs">
        {runs.map((r) => (
          <div
            key={r.id}
            className="x-run"
            data-on={hot === r.id ? "1" : undefined}
            onPointerEnter={() => setHot(r.id)}
            onPointerLeave={() => setHot(null)}
            onFocus={() => setHot(r.id)}
            onBlur={() => setHot(null)}
          >
            <h3 className="x-run__title">{r.title}</h3>
            <div className="x-run__frames">
              {r.frames.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="x-run__frame"
                  style={{ aspectRatio: `${f.w} / ${f.h}` }}
                  onClick={() => setOpen(f.work)}
                  aria-label={`Assistir: ${f.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" width={f.w * 20} height={f.h * 20} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="x-sheet__note" aria-live="polite">
        {cur ? [cur.title, cur.note].filter(Boolean).join(" · ") : " "}
      </p>
      {open && <ProjectModal work={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
