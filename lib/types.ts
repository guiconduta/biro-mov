// Contrato de dados do catálogo. Espelha scripts/validate-catalog.mjs.
// Ver PLAN.md §5 (Fase 3) e fase-2-inventario.md.

export type VideoFormat = "9:16" | "16:9" | "other";
export type Tier = "selected" | "portfolio" | "archive";
export type Grade = "A" | "B" | "C";
export type VideoStatus = "published" | "draft" | "hidden";

export interface Category {
  id: string;
  label: string;
  description: string;
  order: number;
  visible: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string | null;
  context: string | null; // "1 linha de autoridade"
  featured: boolean;
  order: number;
}

export interface Project {
  id: string;
  clientId: string | null; // null = autoral / cliente a definir
  name: string;
  year: number | null;
  isCase: boolean;
  caseSlug: string | null;
  order: number;
}

export interface Video {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  description: string;
  poster: string | null; // poster vertical próprio (9:16)
  thumbnail: string; // fallback do YouTube
  clientId: string | null;
  projectId: string | null;
  category: string; // -> Category.id
  format: VideoFormat;
  durationSec: number; // 0 = desconhecido
  tags: string[];
  role: string[]; // ex.: ["direção","edição"]
  tier: Tier;
  grade: Grade | null; // interno — NUNCA vai para o catálogo público
  featured: boolean;
  order: number;
  status: VideoStatus;
}

export interface Capability {
  id: string;
  label: string;
  intent: string;
  exampleVideoId: string | null;
  exampleImage: string | null;
  order: number;
  pricingRef: string | null;
}

export interface CaseSection {
  heading?: string;
  body: string;
  media?: { type: "video" | "image"; ref: string }[];
}

export interface Case {
  id: string;
  slug: string;
  projectId: string;
  title: string;
  summary: string;
  cover: string;
  sections: CaseSection[];
  videoOrder: string[];
  metrics?: { label: string; value: string }[];
  credits?: { role: string; name: string }[];
  published: boolean;
  featured: boolean;
  order: number;
}

export interface Site {
  name: string;
  wordmark: { light: string; accent: string };
  descriptor: string;
  slogan: string;
  footerTag: string;
  hero: { headline: string; sub: string; ctaLabel: string; media: string };
  process: { step: string; title: string; deliverable: string }[];
  about: { text: string; photo: string };
  contact: { whatsapp: string; instagram: string; email: string; availabilityNote: string };
  flags: { pricingEnabled: boolean };
}

// Vídeo servido ao cliente — sem campos internos (ver regra L4 do PLAN.md).
export type PublicVideo = Omit<Video, "grade" | "status">;
