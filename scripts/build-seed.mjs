/**
 * Gera content/*.json a partir do inventário da Fase 2 (fase-2-inventario.md §3).
 * Fonte de verdade editável: as tabelas abaixo. Rode: npm run seed
 *
 * NÃO sobrescreve capabilities.json, cases.json e site.json se já existirem
 * (esses carregam texto que você edita à mão).
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
mkdirSync(CONTENT, { recursive: true });

const write = (name, data, { keepIfExists = false } = {}) => {
  const path = join(CONTENT, name);
  if (keepIfExists && existsSync(path)) {
    console.log(`  keep   ${name} (já existe)`);
    return;
  }
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`  write  ${name}`);
};

/* ---------- categorias ---------- */
const categories = [
  ["social-films", "Social Films", "Peças verticais para redes, foco em narrativa e ritmo."],
  ["commercial-sales", "Commercial / Sales", "Peça com objetivo comercial direto — anúncio, VSL, lançamento."],
  ["brand-institutional", "Brand / Institutional", "Filme de marca, institucional, cultura, manifesto."],
  ["interviews", "Interviews", "Depoimento, entrevista, documental de personagem."],
  ["real-estate-architecture", "Real Estate / Architecture", "Imóvel, arquitetura, empreendimento."],
  ["automotive", "Automotivo", "Carros — PPF, detailing, apresentação."],
  ["special-projects", "Special Projects", "Fora das caixas acima — curso, experimental, autoral."],
].map(([id, label, description], i) => ({ id, label, description, order: i + 1, visible: true }));

/* ---------- clientes ---------- */
const clients = [
  ["gabi-silva", "Gabi Silva"],
  ["guilherme-matilha", "Guilherme Matilha"],
  ["tabua-cronologica", "Tábua Cronológica da Bíblia"],
  ["amanda-linz", "Amanda Linz"],
  ["the-office-imoveis", "The Office Imóveis"],
  ["giconduta", "GiConduta"],
  ["domma", "Domma"],
  ["amendonca-concretos", "Amendonça Concretos"],
  ["agon-sports-world", "Agon Sports World"],
  ["base-academia", "Base Academia"],
  ["dra-juliana", "Dra. Juliana"],
  ["gps-viagem", "GPS Viagem"],
  ["maquiare", "Maquiare"],
  ["matilha-equilibrada", "Matilha Equilibrada"],
  ["credigil", "Credígil"],
].map(([id, name], i) => ({
  id,
  name,
  logo: null,
  context: null, // "1 linha de autoridade" — pendente
  featured: false,
  order: i + 1,
}));

/* ---------- projetos ---------- */
const projects = [
  ["gm-agitacao-reels", "guilherme-matilha", "Agitação Reels"],
  ["gabi-reels", "gabi-silva", "Reels — Gabi Silva"],
  ["tabua-reels", "tabua-cronologica", "Reel Elaborado — Tábua Cronológica"],
  ["amanda-entrevistas", "amanda-linz", "Entrevistas — Amanda Linz"],
  ["tof-imobiliario", "the-office-imoveis", "Imobiliário — The Office Imóveis"],
  ["giconduta-imobiliario", "giconduta", "Imobiliário — GiConduta"],
  ["imobiliario-avulsos", null, "Imobiliário — avulsos (cliente a definir)"],
  ["domma-reels", "domma", "Branding — Domma"],
  ["amendonca-institucional", "amendonca-concretos", "Institucional — Amendonça"],
  ["amendonca-reel-comercial", "amendonca-concretos", "Reel Comercial — Amendonça"],
  ["automotivo", null, "Automotivo — avulsos"],
  ["agon-reels", "agon-sports-world", "Reels — Agon Sports World"],
].map(([id, clientId, name], i) => ({
  id,
  clientId,
  name,
  year: null,
  isCase: false,
  caseSlug: null,
  order: i + 1,
}));

/* ---------- vídeos ----------
 * [num, youtubeId, title, durSec, clientId|null, category, projectId|null, roleKey]
 * roleKey: "e" = ["edição"]  ·  "de" = ["direção","edição"]
 * tier "portfolio" e status "published" em todos, exceto IA (archive/hidden).
 */
const R = { e: ["edição"], de: ["direção", "edição"] };
const rows = [
  [1, "kGig_W2sPYw", "Edição - Sol de Inverno v2 (Gabi Silva)", 63, "gabi-silva", "social-films", "gabi-reels", "e"],
  [2, "Bda1f9YJ1A4", "Edição - Sol de Inverno (Gabi Silva)", 72, "gabi-silva", "social-films", "gabi-reels", "e"],
  [3, "FfmcFHqCHWI", "Edição - Revelação (Gabi Silva)", 62, "gabi-silva", "social-films", "gabi-reels", "e"],
  [4, "FxL0IlbTR08", "Edição - DeuCookie! (Gabi Silva)", 25, "gabi-silva", "social-films", "gabi-reels", "e"],
  [5, "0CimA0hjBn8", "Edição - Edamami (Gabi Silva)", 60, "gabi-silva", "social-films", "gabi-reels", "e"],
  [6, "2XYcwD68WMk", "Reel Simples - Gabi, Lambari Promo", 33, "gabi-silva", "social-films", "gabi-reels", "e"],
  [7, "JRONQF6-Mlw", "Edição - Encerramento Pátio (Gabi Silva)", 188, "gabi-silva", "social-films", "gabi-reels", "e"],
  [8, "Yz2bun3uItk", "Edição - Lambari Bar (Gabi Silva)", 135, "gabi-silva", "social-films", "gabi-reels", "e"],
  [9, "Tzgx0OJyYv0", "Edição - Ano Novo 2026 (Gabi Silva)", 56, "gabi-silva", "social-films", "gabi-reels", "e"],

  [10, "Vl_NwqHcIoM", "Edição - Guilherme Matilha (Agitação Reels 04)", 0, "guilherme-matilha", "social-films", "gm-agitacao-reels", "e"],
  [11, "8YtCu80kCHc", "Agitação Reels — Guilherme Matilha (título a confirmar)", 0, "guilherme-matilha", "social-films", "gm-agitacao-reels", "e"],
  [12, "jVQWTvj-Upk", "Agitação Reels — Guilherme Matilha (título a confirmar)", 0, "guilherme-matilha", "social-films", "gm-agitacao-reels", "e"],
  [13, "hjTAhYNV8ZE", "Agitação Reels — Guilherme Matilha (título a confirmar)", 0, "guilherme-matilha", "social-films", "gm-agitacao-reels", "e"],

  [14, "t-RBJg0dyN0", "Reel Elaborado - Tábua Cronológica da Bíblia v1", 40, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [15, "0A6YwPXvsZc", "Reel Elaborado - Tábua Cronológica da Bíblia v2", 50, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [16, "Kd1GG35nTC0", "Reel Elaborado - Tábua Cronológica da Bíblia v3", 83, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [17, "kZIfb1hjWQA", "Reel Elaborado - Tábua Cronológica da Bíblia v4", 50, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [18, "8xNfiIyig40", "Reel Elaborado - Tábua Cronológica da Bíblia v5", 62, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [19, "2spEHFspti8", "Reel Elaborado - Tábua Cronológica da Bíblia v6", 53, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [20, "kRGNs4_Kezc", "Reel Elaborado - Tábua Cronológica da Bíblia (HOOK SÉRIE)", 53, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [21, "lwqUkS91BHA", "Reel Elaborado - Tábua Cronológica da Bíblia (Hook Igão v2)", 59, "tabua-cronologica", "social-films", "tabua-reels", "de"],
  [22, "HvcC91MC-2M", "Tábua Cronológica - Histórias Marcantes v2", 47, "tabua-cronologica", "social-films", "tabua-reels", "de"],

  [23, "tXu3kfJEH-I", "Entrevista - Dia dos Namorados 01", 160, "amanda-linz", "interviews", "amanda-entrevistas", "de"],
  [24, "quZub2CGNPU", "Entrevista - Dia dos Namorados 02", 165, "amanda-linz", "interviews", "amanda-entrevistas", "de"],
  [25, "jIOjk-9351Y", "Entrevista - Amanda Linz ft Sussurra pt1", 21, "amanda-linz", "interviews", "amanda-entrevistas", "de"],
  [26, "0Z660l6NO90", "Entrevista - Matilha Equilibrada (Shark Tank)", 103, "matilha-equilibrada", "interviews", null, "de"],
  [27, "MFzyQa2lD90", "Entrevista - Video Edgar Baldasso", 247, "agon-sports-world", "interviews", null, "de"],
  [28, "BL7nZMLfBCA", "Reel Simples - Amanda Promo Entrevista", 53, "amanda-linz", "interviews", "amanda-entrevistas", "de"],

  [29, "M77N0fBci68", "Projeto Imobiliário - The Hill (The Office Imóveis)", 44, "the-office-imoveis", "real-estate-architecture", "tof-imobiliario", "de"],
  [30, "2v87Nf_rEzc", "Projeto Imobiliário - Casa Condomínio Arvoredo (The Office Imóveis)", 52, "the-office-imoveis", "real-estate-architecture", "tof-imobiliario", "de"],
  [31, "3PqBB7WFf0o", "Projeto Imobiliário - Terreno Bairro Glória (GiConduta)", 52, "giconduta", "real-estate-architecture", "giconduta-imobiliario", "de"],
  [32, "YfZO4df9BtI", "Projeto Imobiliário - FG114", 53, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [33, "vbsh1NnVQ4Q", "Projeto Imobiliário - Estrada Dona Franncisca v3", 51, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [34, "MAi8E_p6hDI", "Projeto Imobiliário - Casa Villa Firenzi", 61, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [35, "qtoInBog6v8", "Projeto Imobiliário - Cobertura Jacob Gold v3", 61, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [36, "aICVLJiWwEo", "Projeto Imobiliário - Terreno Márcio v4", 61, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [37, "fBEexqvMJ94", "Projeto Imobiliário - Casa no Quinte Essence v3", 50, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [38, "30q_j5ICL6w", "Projeto Imobiliário - Chácara Saud v1", 56, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [39, "VZqYX9FauCg", "Projeto Imobiliário - Chácara Arroz Vila Nova", 42, null, "real-estate-architecture", "imobiliario-avulsos", "de"],
  [40, "W_cXQ2PKJHI", "Projeto Imobiliário - Sítio Araquari v5", 36, null, "real-estate-architecture", "imobiliario-avulsos", "de"],

  [41, "naqtVtqChh8", "Projeto Simples - DOMMA Day 01", 65, "domma", "brand-institutional", "domma-reels", "de"],
  [42, "KNtDuY30XEY", "Projeto Simples - Domma Day 02", 54, "domma", "brand-institutional", "domma-reels", "de"],
  [43, "43QolJyQS4w", "Projeto Simples - DOMMA Dia Das Mães", 48, "domma", "brand-institutional", "domma-reels", "de"],
  [44, "5-YtmQJstUs", "Projeto Simples - DOMMA Viral 01", 14, "domma", "brand-institutional", "domma-reels", "de"],

  [45, "pqYYLVO8CqA", "Projeto Simples - Amendonça Natal v1", 41, "amendonca-concretos", "brand-institutional", "amendonca-institucional", "de"],
  [46, "lF_hKL6_Vc0", "Projeto Simples - Obra D&T v2 (Amendonça)", 48, "amendonca-concretos", "brand-institutional", "amendonca-institucional", "de"],
  [47, "W-19s4dyCqY", "Projeto Simples - Apresentação Argamassa (Amendonça)", 67, "amendonca-concretos", "brand-institutional", "amendonca-institucional", "de"],
  [48, "KyHUregzJ7c", "Reel Simples - Amendonça Concretos Viral v1", 56, "amendonca-concretos", "brand-institutional", "amendonca-institucional", "de"],
  [49, "nmMePfuJ-_o", "Reel Comercial - Amendonça Produção 01", 60, "amendonca-concretos", "commercial-sales", "amendonca-reel-comercial", "de"],
  [50, "amZYkY7CPBo", "Reel Comercial - Apresentação Argamassa", 44, "amendonca-concretos", "commercial-sales", "amendonca-reel-comercial", "de"],
  [51, "bIRiSXiphr0", "Reel Elaborado - Amendonça Argamassa Estabilizada v1", 47, "amendonca-concretos", "commercial-sales", "amendonca-reel-comercial", "de"],

  [52, "m5Kau1pubeU", "Reel Automotivo - Rover Sport PPF", 56, null, "automotive", "automotivo", "de"],
  [53, "jp4Qvhat6FY", "Reel Automotivo - PPF Carrera 911", 50, null, "automotive", "automotivo", "de"],
  [54, "29pQw_bGyM4", "Reel Automotivo - 911", 46, null, "automotive", "automotivo", "de"],

  [55, "6-kz4sncEdM", "Reel Simples - Agon Sport World (Edgar Belasco)", 62, "agon-sports-world", "commercial-sales", "agon-reels", "de"],
  [56, "9UZhlLdmZj0", "Reel Simples - Agon Sports World v1 (Coach Edgar)", 62, "agon-sports-world", "commercial-sales", "agon-reels", "de"],

  [57, "LVEKgRyPY_Y", "Projeto Simples - Treino v1", 49, "base-academia", "commercial-sales", null, "de"],
  [58, "Fcl4AVosEeE", "Reel Corporativo - Dra. Juliana v1", 36, "dra-juliana", "brand-institutional", null, "de"],
  [59, "7FmQKM3grIU", "VSL - GPS Viagem (LEAD)", 162, "gps-viagem", "commercial-sales", null, "de"],
  [60, "6VOL09C9pzQ", "Curso - Maquiare (Introdução aos Módulos)", 17, "maquiare", "special-projects", null, "de"],

  [61, "WnjdnNbnExs", "Reel IA - Credígil v1", 48, "credigil", "commercial-sales", null, "de"],
  [62, "iLAP0jr_0OQ", "Reel IA - Credígil v2", 37, "credigil", "commercial-sales", null, "de"],
  [63, "-jInY3EH8xs", "Reel IA - Credígil v3", 48, "credigil", "commercial-sales", null, "de"],
];

const AI_HIDDEN = new Set([61, 62, 63]);

const videos = rows.map(([num, yt, title, dur, clientId, category, projectId, roleKey]) => {
  const hidden = AI_HIDDEN.has(num);
  return {
    id: "v" + String(num).padStart(2, "0"),
    youtubeId: yt,
    url: `https://www.youtube.com/watch?v=${yt}`,
    title,
    description: "",
    poster: null, // poster vertical próprio — pendente
    thumbnail: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    clientId,
    projectId,
    category,
    format: "9:16",
    durationSec: dur, // 0 = desconhecido
    tags: [],
    role: R[roleKey],
    tier: hidden ? "archive" : "portfolio", // "selected" = curadoria posterior
    grade: null, // A/B/C — curadoria posterior, nunca público
    featured: false,
    order: num,
    status: hidden ? "hidden" : "published",
  };
});

/* ---------- capabilities / cases / site (não sobrescreve) ---------- */
const capabilities = [
  { id: "direcao", label: "Direção", intent: "Da ideia ao corte: roteiro, decupagem e a decisão do que fica em cena.", exampleVideoId: null, exampleImage: null, order: 1, pricingRef: null },
  { id: "social-films", label: "Social Films", intent: "Peças verticais pensadas para reter — gancho, ritmo e final que converte.", exampleVideoId: null, exampleImage: null, order: 2, pricingRef: null },
  { id: "edicao-ritmo", label: "Edição & Ritmo", intent: "Montagem, som e cor. O corte que segura a atenção do primeiro frame ao CTA.", exampleVideoId: null, exampleImage: null, order: 3, pricingRef: null },
  { id: "imobiliario", label: "Projetos Imobiliários", intent: "Imóvel e empreendimento com linguagem de cinema — o espaço vira desejo.", exampleVideoId: null, exampleImage: null, order: 4, pricingRef: null },
];

const site = {
  name: "BIRO.MOV",
  wordmark: { light: "BIRO", accent: ".MOV" },
  descriptor: "FILMMAKER & EDIÇÃO",
  slogan: "CONTEÚDO VISUAL COM RITMO E DIREÇÃO",
  footerTag: "AUDIOVISUAL · EDIÇÃO · DIREÇÃO · STORYTELLING",
  hero: {
    headline: "Conteúdo visual com ritmo e direção.",
    sub: "", // [linha de posicionamento / conversão — pendente]
    ctaLabel: "Começar um projeto",
    media: "/branding/hero.jpg",
  },
  process: [
    { step: "01", title: "Direção & roteiro", deliverable: "Conceito, referência visual e roteiro aprovado." },
    { step: "02", title: "Captação", deliverable: "Diária de filmagem com direção em set e material bruto organizado." },
    { step: "03", title: "Edição & ritmo", deliverable: "1º corte para revisão, mais 2 rodadas de ajuste, som e cor." },
    { step: "04", title: "Entrega", deliverable: "Masters em 9:16 e 16:9, versões de corte e arquivos para tráfego." },
  ],
  about: { text: "", photo: "/branding/hero.jpg" }, // texto 1ª pessoa — pendente
  contact: { whatsapp: "(47) 99207-4245", instagram: "@biro.mov", email: "gconduta.araujo@gmail.com", availabilityNote: "" },
  flags: { pricingEnabled: false },
};

console.log("seed →");
write("categories.json", categories);
write("clients.json", clients);
write("projects.json", projects);
write("videos.json", videos);
write("capabilities.json", capabilities, { keepIfExists: true });
write("cases.json", [], { keepIfExists: true });
write("site.json", site, { keepIfExists: true });
console.log(`ok — ${videos.length} vídeos, ${clients.length} clientes, ${projects.length} projetos, ${categories.length} categorias`);
