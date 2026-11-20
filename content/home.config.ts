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
  youtubeUrl: "https://www.youtube.com/@otiobiro",
} as const;

export const whatsappUrl = `https://wa.me/${CONTACT.phoneE164}`;
export const telUrl = `tel:+${CONTACT.phoneE164}`;
export const mailUrl = `mailto:${CONTACT.email}`;

/* ------------------------------------------------------------- textos aprovados */
export const COPY = {
  heroTagline: [
    "Transformo ideias em",
    "experiências imersivas,",
    "marcando sua presença no mundo.",
  ],
  heroStatement: ["Reimaginando a vida", "com visual, som e ritmo."],
  cta: "Começar um projeto",
  scroll: "Role para explorar",
  contactHeadline: "Pronto para conquistar o seu espaço no mundo?",
  contactSub: "Me conte sobre o seu projeto e a sua visão, e eu volto com um plano para tirar a sua ideia do papel.",
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
  typeLabel: "Tipo de projeto", // opcional; vai no assunto do e-mail
  typePlaceholder: "Selecione",
  typeOptions: ["Conteúdo para redes", "Vídeo institucional", "Evento / documental", "Imóveis", "Outro"],
  whatsappLabel: "WhatsApp (opcional)",
  whatsappPlaceholder: "(47) 99999-9999",
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
  // BIRO + descritor (DIREÇÃO / AUDIOVISUAL) são contornos da American Captain gerados por
  // scripts/build-brandmark.mjs — para mudar o texto, edite o script e rode de novo.
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
  // provisório: o "Olá 2026" ocupa o lugar até o showreel oficial ficar pronto (troque o youtubeId)
  provider: "youtube",
  videoUrl: "",
  vimeoId: "",
  youtubeId: "Tzgx0OJyYv0",
  poster: "https://i.ytimg.com/vi/Tzgx0OJyYv0/maxres1.jpg", // quadro automático do YouTube; troque por imagem própria se quiser
  previewUrl: "",
};

/* ------------------------------------------------- trabalhos em destaque */
export type Work = {
  title: string;
  description?: string; // 1-2 frases sobre o projeto (vazio = placeholder)
  category: string;
  year: string;
  roles: string[];
  poster: string; // imagem grande (vazio = placeholder)
  videoPreview: string; // loop curto mudo p/ hover (opcional)
  projectUrl: string; // vazio = card sem link (sem youtubeId, abre este link)
  youtubeId?: string; // com ID: o clique abre o vídeo numa tela dentro do site
  aspect?: "16:9" | "9:16"; // formato do vídeo (padrão 16:9)
};

// o 1º entra em tela cheia, os seguintes alternam o lado da foto. ("Olá 2026" está no Showreel.)
export const FEATURED_WORKS: Work[] = [
  {
    title: "Encerramento do Pátio",
    category: "Documental",
    year: "2025",
    roles: ["Editor"],
    poster: "https://i.ytimg.com/vi/JRONQF6-Mlw/maxresdefault.jpg?v=20260922", // capa automática do YouTube (?v= força o cache a buscar de novo quando a capa mudar no canal)
    videoPreview: "",
    projectUrl: "https://www.youtube.com/watch?v=JRONQF6-Mlw",
    youtubeId: "JRONQF6-Mlw",
  },
  {
    title: "Festival de Dança Joinville",
    category: "Documental",
    year: "2026",
    roles: ["Editor"],
    poster: "https://i.ytimg.com/vi/hWx64S44OUY/maxresdefault.jpg?v=20260922", // capa automática do YouTube (?v= força o cache a buscar de novo quando a capa mudar no canal)
    videoPreview: "",
    projectUrl: "https://www.youtube.com/watch?v=hWx64S44OUY",
    youtubeId: "hWx64S44OUY",
  },
];

/* ----------------------------------------------------------------- sobre */
export const SOBRE_HEADLINE = "Sobre"; // headline grande (definido pelo autor)
// texto pessoal — separe parágrafos com linha em branco
export const SOBRE_TEXT = `Mexo com editores de vídeo desde os 12 anos. Aos 14, me apaixonei de verdade: fazia montagens para uma comunidade de games no YouTube, e alguns vídeos chegaram a 2 milhões de visualizações. Mais do que os números, o que me marcou foi perceber que dava para moldar a realidade de um vídeo e fazer as pessoas sentirem alguma coisa com ele.

A vida me levou para outros caminhos, mas o meu sonho me trouxe de volta. Hoje sou filmmaker e editor em Joinville e região, e é isso que eu busco em cada projeto: criar pontes entre as pessoas e fazer com que quem assiste saia um pouco diferente de como chegou.`;

export const ABOUT = {
  photo: "/branding/sobre.jpg",
  photoAlt: "Biro filmando com uma câmera mirrorless",
  photoWidth: 2000,
  photoHeight: 1335,
} as const;

/* -------------------------------------------------- clientes e experiências */
export type ClientItem = {
  name: string;
  project: string; // vazio = não mostra
  year: string; // vazio = não mostra
  logo: string; // vazio = mostra o nome. Logos em public/clients/, já em branco sobre transparente
  logoWidth?: number;
  logoHeight?: number;
};

export const CLIENTS: ClientItem[] = [
  { name: "Amendonça Concretos", project: "", year: "", logo: "/clients/amendonca.webp", logoWidth: 590, logoHeight: 214 },
  { name: "Festival Parental", project: "", year: "", logo: "/clients/festival-parental.webp", logoWidth: 720, logoHeight: 225 },
  { name: "Our Team Basketball Joinville", project: "", year: "", logo: "/clients/our-team.webp", logoWidth: 164, logoHeight: 240 },
  { name: "Halsten", project: "", year: "", logo: "/clients/halsten.webp", logoWidth: 720, logoHeight: 70 },
  { name: "Maquiare", project: "", year: "", logo: "/clients/maquiare.webp", logoWidth: 474, logoHeight: 149 },
  { name: "Matilha Equilibrada", project: "", year: "", logo: "/clients/matilha-equilibrada.webp", logoWidth: 244, logoHeight: 240 },
];

/* ------------------------------------------------------ por que me escolher */
export type WhyIcon = "users" | "palette" | "eye" | "sparkle" | "chart" | "clipboard";
export type WhyItem = { kicker: string; title: string; text: string; icon: WhyIcon };

/** Tradução da seção de referência. [N] = número real que você ainda precisa preencher. */
export const WHY_ME = {
  eyebrow: "POR QUE EU",
  title: "Por que me escolher?",
  sub: "Seis motivos que elevam a sua presença.",
  items: [
    // kicker vazio = não mostra a etiqueta pequena acima do título
    { kicker: "", title: "Direção criativa do início ao fim", text: "Cada projeto passa por mim, da ideia à entrega, e conta com uma equipe de edição e design quando precisa de mais mãos.", icon: "users" },
    { kicker: "", title: "Leitor de emoções", text: "De conteúdos para redes sociais a documentários, eu sei o que você precisa dizer e sei o que quem assiste vai sentir. É assim que um vídeo não é apenas visto, mas lembrado.", icon: "eye" },
    { kicker: "", title: "Experiência imersiva", text: "Produzir comigo traz um olhar profissional e, ao mesmo tempo, muito pessoal para o seu conteúdo. Quem assiste não sente que está olhando para uma tela, e sim tendo uma conversa natural com você, frente a frente.", icon: "chart" },
    { kicker: "", title: "Identidade", text: "Eu ajudo você a encontrar a sua identidade visual própria.", icon: "palette" },
    { kicker: "", title: "Transparência", text: "Prazos, roteiros e um material de apoio para você chegar preparado na gravação. Tudo combinado antes de começar.", icon: "clipboard" },
    { kicker: "", title: "Fidelidade", text: "Pacotes mensais com desconto para quem quer conteúdo com constância.", icon: "sparkle" },
  ] satisfies WhyItem[],
};

/* --------------------------------------------------------- como trabalho */
/**
 * photo (opcional): imagem em public/workflow/, ocupa o "monitor" da etapa.
 * focus (opcional): que parte da foto fica no quadro, em CSS object-position (padrão "60% 45%").
 */
export type WorkflowStep = { title: string; text: string; photo?: string; focus?: string };

/**
 * Cada item vira um clipe na timeline do "Como trabalho", na ordem.
 * Títulos = sugestão inicial (troque à vontade). text vazio = aparece [TEXTO DA ETAPA].
 */
export const WORKFLOW_DATA: WorkflowStep[] = [
  { title: "Pré-produção", text: "Tudo começa com uma conversa de 30 minutos a uma hora. A ideia é levar a sua marca para outro patamar, com cara de profissional, mas sem perder o que ela tem de seu. Nessa conversa eu conheço você e a sua marca de verdade: o que você quer alcançar, para quem você fala, qual é a sua voz e a sua imagem." },
  { title: "Captação", text: "No dia da gravação, a gente chega com o roteiro já aprovado. Você só precisa fazer o que combinamos, e dá para gravar vários roteiros na mesma sessão. Se a câmera te trava, eu dirijo cada take com você até sair natural. Para mim, profissional de verdade é isso: sua marca num outro nível, sem parecer forçado.", photo: "/workflow/captacao.webp" },
  { title: "Edição", text: "Aqui é onde a mágica acontece. Com o material gravado do jeito que combinamos, a edição é a parte em que eu mais me entrego. Muitas ideias aparecem só na hora de montar e fazem o vídeo ganhar uma cara nova, muitas vezes melhor do que o planejado, mas sempre dentro do que a gente definiu.", photo: "/workflow/edicao.webp" },
  { title: "Cor", text: "A cor é o clima do vídeo. Tenho bastante bagagem de referências cinematográficas, então consigo criar a ambientação certa para cada projeto. Nos primeiros segundos, a sensação já está ali, antes mesmo de qualquer fala aparecer.", photo: "/workflow/cor.webp", focus: "60% 100%" },
  { title: "Som", text: "O som é um dos estímulos mais fortes de um vídeo. Trabalho com uma biblioteca profissional, usada por grandes criadores de conteúdo e grandes produtoras, e tem projeto que chega a 10 ou 15 camadas de áudio. É assim que a ambientação fica certa e quem assiste sente que está vivendo junto o que acontece no vídeo.", photo: "/workflow/som.webp" },
  { title: "Entrega", text: "Entrego tudo por plataforma digital, já no formato certo para cada rede. Você assiste, avalia e pede os ajustes. As rodadas de revisão variam conforme o projeto, e a gente vai ajustando até chegar na versão final que você quer.", photo: "/workflow/entrega.webp" },
];
