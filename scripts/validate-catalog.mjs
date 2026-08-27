/**
 * Valida content/*.json contra o schema e checa integridade de FKs.
 * Sai 0 se tudo bate; sai 1 e lista os erros caso contrário.
 * Rode: npm run validate:catalog
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const CONTENT = join(dirname(fileURLToPath(import.meta.url)), "..", "content");
const read = (name) => JSON.parse(readFileSync(join(CONTENT, name), "utf8"));

const slug = z.string().regex(/^[a-z0-9-]+$/, "slug inválido (a-z 0-9 -)");

const Category = z.object({
  id: slug,
  label: z.string().min(1),
  description: z.string(),
  order: z.number().int().positive(),
  visible: z.boolean(),
});

const Client = z.object({
  id: slug,
  name: z.string().min(1),
  logo: z.string().nullable(),
  context: z.string().nullable(),
  featured: z.boolean(),
  order: z.number().int().positive(),
});

const Project = z.object({
  id: slug,
  clientId: slug.nullable(),
  name: z.string().min(1),
  year: z.number().int().nullable(),
  isCase: z.boolean(),
  caseSlug: z.string().nullable(),
  order: z.number().int().positive(),
});

const Video = z.object({
  id: z.string().regex(/^v\d{2,}$/),
  youtubeId: z.string().min(5),
  url: z.string().url(),
  title: z.string().min(1),
  description: z.string(),
  poster: z.string().nullable(),
  thumbnail: z.string().url(),
  clientId: slug.nullable(),
  projectId: slug.nullable(),
  category: slug,
  format: z.enum(["9:16", "16:9", "other"]),
  durationSec: z.number().int().nonnegative(),
  tags: z.array(z.string()),
  role: z.array(z.string()),
  tier: z.enum(["selected", "portfolio", "archive"]),
  grade: z.enum(["A", "B", "C"]).nullable(),
  featured: z.boolean(),
  order: z.number().int(),
  status: z.enum(["published", "draft", "hidden"]),
});

const Capability = z.object({
  id: slug,
  label: z.string().min(1),
  intent: z.string(),
  exampleVideoId: z.string().nullable(),
  exampleImage: z.string().nullable(),
  order: z.number().int().positive(),
  pricingRef: z.string().nullable(),
});

const CaseSection = z.object({
  heading: z.string().optional(),
  body: z.string(),
  media: z.array(z.object({ type: z.enum(["video", "image"]), ref: z.string() })).optional(),
});
const Case = z.object({
  id: slug,
  slug: slug,
  projectId: slug,
  title: z.string().min(1),
  summary: z.string(),
  cover: z.string(),
  sections: z.array(CaseSection),
  videoOrder: z.array(z.string()),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  credits: z.array(z.object({ role: z.string(), name: z.string() })).optional(),
  published: z.boolean(),
  featured: z.boolean(),
  order: z.number().int(),
});

const Site = z.object({
  name: z.string(),
  wordmark: z.object({ light: z.string(), accent: z.string() }),
  descriptor: z.string(),
  slogan: z.string(),
  footerTag: z.string(),
  hero: z.object({ headline: z.string(), sub: z.string(), ctaLabel: z.string(), media: z.string() }),
  process: z.array(z.object({ step: z.string(), title: z.string(), deliverable: z.string() })),
  about: z.object({ text: z.string(), photo: z.string() }),
  contact: z.object({ whatsapp: z.string(), instagram: z.string(), email: z.string(), availabilityNote: z.string() }),
  flags: z.object({ pricingEnabled: z.boolean() }),
});

const errors = [];
const fail = (m) => errors.push(m);

const parseAll = (name, schema, arr) => {
  arr.forEach((item, i) => {
    const r = schema.safeParse(item);
    if (!r.success) fail(`${name}[${i}] (${item.id ?? "?"}): ${r.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
  });
};

const categories = read("categories.json");
const clients = read("clients.json");
const projects = read("projects.json");
const videos = read("videos.json");
const capabilities = read("capabilities.json");
const cases = read("cases.json");
const site = read("site.json");

parseAll("categories", Category, categories);
parseAll("clients", Client, clients);
parseAll("projects", Project, projects);
parseAll("videos", Video, videos);
parseAll("capabilities", Capability, capabilities);
parseAll("cases", Case, cases);
{
  const r = Site.safeParse(site);
  if (!r.success) fail(`site.json: ${r.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
}

/* ---- integridade referencial ---- */
const catIds = new Set(categories.map((c) => c.id));
const clientIds = new Set(clients.map((c) => c.id));
const projectIds = new Set(projects.map((p) => p.id));
const videoIds = new Set(videos.map((v) => v.id));

const uniq = (name, arr) => {
  const seen = new Set();
  for (const id of arr) {
    if (seen.has(id)) fail(`${name}: id duplicado "${id}"`);
    seen.add(id);
  }
};
uniq("categories", categories.map((c) => c.id));
uniq("clients", clients.map((c) => c.id));
uniq("projects", projects.map((p) => p.id));
uniq("videos", videos.map((v) => v.id));
uniq("videos.youtubeId", videos.map((v) => v.youtubeId));

for (const p of projects) {
  if (p.clientId !== null && !clientIds.has(p.clientId)) fail(`projects "${p.id}": clientId "${p.clientId}" não existe`);
}
for (const v of videos) {
  if (!catIds.has(v.category)) fail(`videos "${v.id}": category "${v.category}" não existe`);
  if (v.clientId !== null && !clientIds.has(v.clientId)) fail(`videos "${v.id}": clientId "${v.clientId}" não existe`);
  if (v.projectId !== null && !projectIds.has(v.projectId)) fail(`videos "${v.id}": projectId "${v.projectId}" não existe`);
}
for (const c of capabilities) {
  if (c.exampleVideoId !== null && !videoIds.has(c.exampleVideoId)) fail(`capabilities "${c.id}": exampleVideoId "${c.exampleVideoId}" não existe`);
}
for (const c of cases) {
  if (!projectIds.has(c.projectId)) fail(`cases "${c.id}": projectId "${c.projectId}" não existe`);
  for (const vid of c.videoOrder) if (!videoIds.has(vid)) fail(`cases "${c.id}": videoOrder "${vid}" não existe`);
}

/* ---- regra crítica: catálogo público não vaza grade nem draft/hidden ---- */
// (checagem informativa — o build público é feito em lib/catalog.ts)
const leak = videos.filter((v) => v.status !== "published" && v.tier === "selected");
if (leak.length) fail(`vídeos non-published marcados como selected: ${leak.map((v) => v.id).join(", ")}`);

if (errors.length) {
  console.error(`✗ ${errors.length} erro(s):\n` + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
const pub = videos.filter((v) => v.status === "published").length;
console.log(`✓ catálogo válido — ${videos.length} vídeos (${pub} públicos), ${clients.length} clientes, ${projects.length} projetos, ${categories.length} categorias, ${cases.length} cases`);
