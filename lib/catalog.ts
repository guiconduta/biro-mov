// Loader do catálogo. O renderer nunca lê JSON direto — passa por aqui.
// Os JSON são gerados por scripts/build-seed.mjs e validados por
// scripts/validate-catalog.mjs (npm run validate:catalog).

import type {
  Capability,
  Case,
  Category,
  Client,
  Project,
  PublicVideo,
  Site,
  Video,
} from "./types";

import categoriesJson from "@/content/categories.json";
import clientsJson from "@/content/clients.json";
import projectsJson from "@/content/projects.json";
import videosJson from "@/content/videos.json";
import capabilitiesJson from "@/content/capabilities.json";
import casesJson from "@/content/cases.json";
import siteJson from "@/content/site.json";

const categories = categoriesJson as Category[];
const clients = clientsJson as Client[];
const projects = projectsJson as Project[];
const videos = videosJson as Video[];
const capabilities = capabilitiesJson as Capability[];
const cases = casesJson as Case[];
export const site = siteJson as Site;

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

// ---- campos internos removidos antes de qualquer coisa chegar ao cliente ----
const toPublic = (v: Video): PublicVideo => {
  const { grade: _g, status: _s, ...pub } = v;
  void _g;
  void _s;
  return pub;
};

/** Todos os vídeos publicados, sem campos internos, ordenados. */
export function getVideos(): PublicVideo[] {
  return videos
    .filter((v) => v.status === "published")
    .sort(byOrder)
    .map(toPublic);
}

/** Vídeos de um tier (selected | portfolio). archive fica de fora por padrão. */
export function getVideosByTier(tier: "selected" | "portfolio"): PublicVideo[] {
  return getVideos().filter((v) => v.tier === tier);
}

/** Os que aparecem na Home (Selected Work). */
export function getSelectedWork(): PublicVideo[] {
  return getVideosByTier("selected");
}

/**
 * Reel da Home. Enquanto a curadoria de `selected` não acontece, cai para os
 * primeiros N da biblioteca (por `order`). Substituir quando o usuário marcar
 * os selected no inventário.
 */
export function getHomeReel(limit = 8): PublicVideo[] {
  const sel = getSelectedWork();
  if (sel.length) return sel.slice(0, 12);
  // fallback sem curadoria: espalha por cliente para não repetir o mesmo
  const lib = getLibrary();
  const seen = new Set<string>();
  const spread = lib.filter((v) => {
    const key = v.clientId ?? v.projectId ?? v.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return (spread.length >= limit ? spread : lib).slice(0, limit);
}

/** Biblioteca /work: selected + portfolio (archive excluído). */
export function getLibrary(): PublicVideo[] {
  return getVideos().filter((v) => v.tier !== "archive");
}

export function getVideo(id: string): PublicVideo | undefined {
  return getVideos().find((v) => v.id === id);
}

export function getCategories(): Category[] {
  return [...categories].filter((c) => c.visible).sort(byOrder);
}

export function getClients(): Client[] {
  return [...clients].sort(byOrder);
}

/** Clientes destacados na seção Clients — só os com vídeo publicado. */
export function getFeaturedClients(): Client[] {
  const withPublished = new Set(getVideos().map((v) => v.clientId).filter(Boolean));
  return getClients().filter((c) => c.featured && withPublished.has(c.id));
}

/**
 * Clientes que têm ao menos um vídeo publicado. Enquanto `featured` não é
 * curado, a seção Clients usa esta lista.
 */
export function getClientsWithWork(): Client[] {
  const withPublished = new Set(getVideos().map((v) => v.clientId).filter(Boolean));
  const featured = getFeaturedClients();
  return featured.length
    ? featured
    : getClients().filter((c) => withPublished.has(c.id));
}

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getVideosOfProject(projectId: string): PublicVideo[] {
  return getVideos().filter((v) => v.projectId === projectId);
}

export function getCapabilities(): Capability[] {
  return [...capabilities].sort(byOrder);
}

export function getFeaturedCases(): Case[] {
  return cases.filter((c) => c.published && c.featured).sort(byOrder);
}

export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug && c.published);
}

/** Contagem por categoria (para os filtros da biblioteca). */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const v of getLibrary()) counts[v.category] = (counts[v.category] ?? 0) + 1;
  return counts;
}
