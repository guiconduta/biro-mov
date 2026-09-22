/**
 * BIRO.mov — conteúdo editável da Home.
 *
 * Tudo que aparece na página inicial e você pode querer trocar mora AQUI:
 * contato, redes, showreel, trabalhos em destaque, sobre, clientes, workflow.
 *
 * Regra: só existem textos aprovados. O que ainda não foi definido está como
 * placeholder em [COLCHETES] — troque pelo conteúdo real.
 * (A biblioteca completa em /work vem de content/videos.json, não daqui.)
 */

/* ------------------------------------------------------------------ contato */
export const CONTACT = {
  phoneDisplay: "(47) 99207-4245",
  phoneE164: "5547992074245", // DDI + DDD + número, só dígitos (usado em tel: e wa.me)
  email: "gconduta.araujo@gmail.com",
  instagramUrl: "https://instagram.com/biro.mov",
  instagramHandle: "@biro.mov",
  vimeoUrl: "", // [VIMEO] ex.: "https://vimeo.com/seu-usuario" — vazio = ícone desativado
} as const;

export const whatsappUrl = `https://wa.me/${CONTACT.phoneE164}`;
export const telUrl = `tel:+${CONTACT.phoneE164}`;
export const mailUrl = `mailto:${CONTACT.email}`;

/* ------------------------------------------------------------- textos aprovados */
export const COPY = {
  heroTagline: [
    "Transformo ideias em",
    "experiências imersivas,",
    "marcando sua presença digital.",
  ],
  heroStatement: ["Reimaginando a vida", "com visual, som e ritmo."],
  cta: "Começar um projeto",
  scroll: "Role para explorar",
  contactHeadline: "Pronto para uma imersão?",
  contactSub: "Me diga sobre seu projeto e retornarei com um plano para trazer sua ideia à realidade.",
  seeAllWorks: "Ver todos os trabalhos",
  seeProject: "Ver projeto",
} as const;

/* ----------------------------------------------------------- formulário de contato */
export const CONTACT_FORM = {
  cardTitle: "Fale comigo",
  cardSub: "Preencha o formulário e eu respondo em até 24 horas.",
  statusLabel: "Disponível agora",
  nameLabel: "Nome",
  namePlaceholder: "Seu nome",
  emailLabel: "E-mail",
  emailPlaceholder: "seu@email.com",
  messageLabel: "Mensagem",
  messagePlaceholder: "Conte sobre seu projeto...",
  submitLabel: "Enviar mensagem",
} as const;

/* --------------------------------------------------------------- navegação */
export const NAV = {
  col1: [
    { label: "Início", href: "/#inicio" },
    { label: "Show reel", href: "/#showreel" },
    { label: "Trabalhos", href: "/#trabalhos" },
  ],
  col2: [
    { label: "Sobre", href: "/#sobre" },
    { label: "Como trabalho", href: "/#como-trabalho" },
    { label: "Contato", href: "/#contato" },
  ],
} as const;

/* ---------------------------------------------------------------- hero */
export const HERO = {
  /** Recorte do retrato (PNG/WebP transparente). Troque o arquivo em public/branding/. */
  figure: "/branding/biro-cutout.webp",
  figureAlt: "Retrato de Biro",
  figureWidth: 1260,
  figureHeight: 1123,
} as const;

/* ------------------------------------------------------------- showreel */
export type ShowreelConfig = {
  /** "file" = mp4 hospedado · "vimeo" · "youtube" · null = ainda sem vídeo (placeholder) */
  provider: "file" | "vimeo" | "youtube" | null;
  videoUrl: string; // provider "file": /videos/showreel.mp4 ou URL
  vimeoId: string; // provider "vimeo": só o número
  youtubeId: string; // provider "youtube"
  poster: string; // imagem de capa (recomendado 1920×1080)
  previewUrl: string; // opcional: loop curto MUDO para o hover no desktop
};

export const SHOWREEL: ShowreelConfig = {
  provider: null, // [SHOWREEL] em edição
  videoUrl: "",
  vimeoId: "",
  youtubeId: "",
  poster: "",
  previewUrl: "",
};

/* ------------------------------------------------- trabalhos em destaque (3) */
export type Work = {
  title: string;
  category: string;
  year: string;
  roles: string[];
  poster: string; // imagem grande (vazio = placeholder)
  videoPreview: string; // loop curto mudo p/ hover (opcional)
  projectUrl: string; // vazio = card sem link (sem youtubeId, abre este link)
  youtubeId?: string; // com ID: o clique abre o vídeo numa tela dentro do site
  aspect?: "16:9" | "9:16"; // formato do vídeo (padrão 16:9)
};

export const FEATURED_WORKS: [Work, Work, Work] = [
  {
    title: "Encerramento do Pátio",
    category: "Documental",
    year: "2025",
    roles: ["Editor"],
    poster: "https://i.ytimg.com/vi/JRONQF6-Mlw/maxresdefault.jpg", // capa automática do YouTube; troque por imagem própria se quiser
    videoPreview: "",
    projectUrl: "https://www.youtube.com/watch?v=JRONQF6-Mlw",
    youtubeId: "JRONQF6-Mlw",
  },
  {
    title: "Festival de Dança Joinville",
    category: "Documental",
    year: "2026",
    roles: ["Editor"],
    poster: "https://i.ytimg.com/vi/hWx64S44OUY/maxresdefault.jpg", // capa automática do YouTube; troque por imagem própria se quiser
    videoPreview: "",
    projectUrl: "https://www.youtube.com/watch?v=hWx64S44OUY",
    youtubeId: "hWx64S44OUY",
  },
  {
    title: "Olá 2026",
    category: "Showreel",
    year: "2026",
    roles: ["Editor"],
    poster: "https://i.ytimg.com/vi/Tzgx0OJyYv0/maxresdefault.jpg", // capa automática do YouTube; troque por imagem própria se quiser
    videoPreview: "",
    projectUrl: "https://www.youtube.com/watch?v=Tzgx0OJyYv0",
    youtubeId: "Tzgx0OJyYv0",
  },
];

/* ----------------------------------------------------------------- sobre */
export const SOBRE_HEADLINE = "Sobre"; // headline grande (definido pelo autor)
export const SOBRE_TEXT = ""; // [SOBRE_TEXT] texto pessoal — separe parágrafos com linha em branco

export const ABOUT = {
  photo: "/branding/sobre.jpg",
  photoAlt: "Biro filmando com uma câmera mirrorless",
  photoWidth: 2000,
  photoHeight: 1335,
  roles: ["Videomaker", "Criação", "Direção", "Edição"],
} as const;

/* -------------------------------------------------- clientes e experiências */
export type ClientItem = {
  name: string;
  project: string;
  year: string;
  logo: string; // vazio = mostra o nome
};

export const CLIENTS: ClientItem[] = [
  { name: "[CLIENTE 01]", project: "[PROJETO]", year: "[ANO]", logo: "" },
  { name: "[CLIENTE 02]", project: "[PROJETO]", year: "[ANO]", logo: "" },
  { name: "[CLIENTE 03]", project: "[PROJETO]", year: "[ANO]", logo: "" },
  { name: "[CLIENTE 04]", project: "[PROJETO]", year: "[ANO]", logo: "" },
  { name: "[CLIENTE 05]", project: "[PROJETO]", year: "[ANO]", logo: "" },
  { name: "[CLIENTE 06]", project: "[PROJETO]", year: "[ANO]", logo: "" },
];

/* --------------------------------------------------------- como trabalho */
export type WorkflowStep = { title: string; text: string };

/** [WORKFLOW_DATA] — vazio por enquanto. Cada item vira uma etapa. */
export const WORKFLOW_DATA: WorkflowStep[] = [];
