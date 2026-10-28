// Experimento "contact sheet": monta os quadros a partir do material real (miniaturas e quadros
// que o próprio YouTube extrai de cada vídeo). Nada aqui é imagem de banco.
import { FEATURED_WORKS, type Work } from "@/content/home.config";
import { getLibrary, getProjects, getClients } from "@/lib/catalog";

export type Frame = {
  key: string;
  src: string;
  w: number;
  h: number;
  title: string;
  work: Work;
};

export type Run = { id: string; title: string; note: string; frames: Frame[] };

const yt = (id: string, file: string) => `https://i.ytimg.com/vi/${id}/${file}.jpg`;

function workFromFeatured(w: Work): Work {
  return { ...w, aspect: w.aspect ?? "16:9" };
}

/** Os 3 destaques (horizontais): capa + 3 quadros do vídeo. */
export function featuredRuns(): Run[] {
  return FEATURED_WORKS.filter((w) => w.youtubeId).map((w) => {
    const id = w.youtubeId!;
    const work = workFromFeatured(w);
    const files = ["maxresdefault", "mq1", "mq2", "mq3"];
    return {
      id,
      title: w.title,
      note: [w.category, w.year].filter(Boolean).join(" · "),
      frames: files.map((f) => ({ key: `${id}-${f}`, src: yt(id, f), w: 16, h: 9, title: w.title, work })),
    };
  });
}

/** Alguns vídeos do catálogo são horizontais e não têm a capa vertical (oar2): esses usam a capa 16:9. */
async function verticalIds(ids: string[]): Promise<Set<string>> {
  const ok = await Promise.all(
    ids.map(async (id) => {
      try {
        const r = await fetch(yt(id, "oar2"), { method: "HEAD", cache: "force-cache" });
        return r.ok ? id : null;
      } catch {
        return id;
      }
    }),
  );
  return new Set(ok.filter((x): x is string => !!x));
}

/** Catálogo agrupado por projeto: cada projeto vira uma sequência de quadros. */
export async function libraryRuns(): Promise<Run[]> {
  // os destaques já têm a sua sequência lá em cima: não repetem aqui
  const featuredIds = new Set(FEATURED_WORKS.map((w) => w.youtubeId).filter(Boolean));
  const videos = getLibrary().filter((v) => !featuredIds.has(v.youtubeId));
  const vertical = await verticalIds(videos.map((v) => v.youtubeId));
  const frameOf = (v: (typeof videos)[number]): Frame => {
    const isV = vertical.has(v.youtubeId);
    return {
      key: v.id,
      src: yt(v.youtubeId, isV ? "oar2" : "hq720"),
      w: isV ? 9 : 16,
      h: isV ? 16 : 9,
      title: v.title,
      work: { title: v.title, category: "", year: "", roles: [], poster: "", videoPreview: "", projectUrl: v.url, youtubeId: v.youtubeId, aspect: isV ? "9:16" : "16:9" },
    };
  };
  const clients = new Map(getClients().map((c) => [c.id, c.name]));
  const runs: Run[] = [];
  for (const p of getProjects()) {
    const vs = videos.filter((v) => v.projectId === p.id);
    if (!vs.length) continue;
    const client = p.clientId ? clients.get(p.clientId) : undefined;
    runs.push({
      id: p.id,
      // notas internas entre parênteses ("cliente a definir") não vão para o público
      title: (p.name || client || p.id).replace(/\s*\([^)]*\)\s*/g, " ").trim(),
      note: [client && client !== p.name ? client : "", p.year].filter(Boolean).join(" · "),
      frames: vs.map(frameOf),
    });
  }
  const loose = videos.filter((v) => !v.projectId);
  if (loose.length) {
    runs.push({
      id: "avulsos",
      title: "Avulsos",
      note: "",
      frames: loose.map(frameOf),
    });
  }
  return runs;
}

/** Faixa do topo: os destaques e depois um quadro de cada vídeo do catálogo. */
export function stripFrames(library: Run[]): Frame[] {
  const featured = featuredRuns().map((r) => r.frames[0]);
  const seen = new Set(featured.map((f) => f.work.youtubeId));
  return [...featured, ...library.flatMap((r) => r.frames).filter((f) => !seen.has(f.work.youtubeId))];
}
