# CLAUDE.md — Portfólio BIRO.MOV

Contexto permanente do projeto. Leia antes de qualquer tarefa.
Se uma decisão aqui conflitar com um pedido meu, **avise antes de codar**.

Este projeto não tem nada a ver com o Earshot (`Desktop\Earshot\MD`). Regras de lá
não valem aqui.

---

## 1. O que é

Site de portfólio audiovisual da marca **BIRO.MOV** (filmmaker e editor). Proposta:
direção cinematográfica que converte. Canal de origem dos vídeos: `youtube.com/@otiobiro`.

- **No ar:** https://biro-mov.vercel.app (Vercel, projeto `biro-mov`)
- **Repo:** `github.com/guiconduta/biro-mov`
- **Status:** é **protótipo**. Construir → eu analiso → reajusto o design → só então o
  link vai pra bio. Sem pressa nos textos pendentes.

## 2. Documentos do projeto

| Arquivo | Papel |
|---|---|
| `portfolio-biro-etapa1.md` | briefing estratégico — **fonte de verdade** |
| `PLAN.md` | roteiro por fases (aprovado em 2026-08-27) |
| `fase-1-arquitetura-informacao.md` | entrega da Fase 1 (IA, sitemap) |
| `fase-2-inventario.md` | inventário mestre dos vídeos (§3, V01–V63) e taxonomia |
| `design-foundation.md` | sistema visual (atenção: pode estar atrás do v4, ver seção 5) |
| `README.md` | como rodar, scripts e deploy |

## 3. Regras não-negociáveis

1. **Nunca inventar copy.** Só entra no site texto que eu aprovei. Texto pendente fica
   marcado (`[colchetes]`, `[TEXTO DA ETAPA]`, "a confirmar").
2. **Mostrar print antes de publicar** qualquer mudança visual grande.
3. **Push pra `main` = publicar.** A Vercel redeploya a cada push. Nunca dar push sem eu
   pedir.
4. **Sem CMS.** Todo conteúdo é editado no repositório, via Claude Code.
5. **Sem bibliotecas novas** sem me perguntar. Animações são próprias
   (`components/ui/Reveal.tsx`, `Magnetic.tsx`).
6. **Fonte American Captain:** licença grátis só pra uso pessoal e proíbe distribuir o
   arquivo. Nunca commitar nem servir o `.ttf`. O hero usa os contornos já convertidos em
   SVG (`scripts/build-brandmark.mjs` → `components/site/brandmark.generated.ts`).
   Recomendado comprar licença comercial (thefontry.com) antes de lançar.

## 4. Stack e estrutura

Next.js 15 (App Router, TypeScript, Tailwind 4), `zod` pra validar o catálogo.

- `app/` — rotas: `/` (Home), `/work`, `/cases`, `/cases/[slug]`, `/pricing` (escondida
  enquanto `pricingEnabled=false`, `noindex`), `robots.ts`, `sitemap.ts`, `not-found.tsx`.
- `components/site/` — seções da Home. `components/work/WorkStage.tsx` — palco 3D do
  `/work`. `components/ui/` — Reveal, Magnetic, HeroParallax, ScrollTimecode.
  `components/LiteYouTube.tsx` — player leve (capa primeiro, iframe só no play,
  `youtube-nocookie`). Isola o player caso um dia migre pra Cloudflare Stream.
- `content/home.config.ts` — conteúdo editável da Home v4 (showreel, trabalhos, Sobre,
  clientes, etapas do Como trabalho).
- `scripts/build-seed.mjs` — **fonte de verdade** de vídeos/clientes/projetos. Editar as
  tabelas ali e rodar `npm run seed` (gera `content/*.json`).
- `lib/catalog.ts` — leitura tipada; remove `grade`/`status` do que vai ao público.
- `lib/config.ts` — `SITE_URL` (env `NEXT_PUBLIC_SITE_URL` > domínio de produção da
  Vercel). Domínio próprio = configurar na Vercel, zero código.
- `vercel.json` fixa o preset `nextjs` (sem ele o deploy dava 404 em tudo).

Comandos: `npm run dev` (porta 3000, `.claude/launch.json`), `npm run build`,
`npm run seed`, `npm run validate:catalog`, `npm run typecheck`.

## 5. Estado atual do design (v4)

O v4 substituiu todas as versões anteriores (v2 circular, v3.1 estilo gabrielside,
polimento Nguyan). Peças antigas são recuperáveis pelo git, não reintroduzir sem pedido.

- Phthalo Green como luz, fundo `#030807`. Fontes **Archivo** (display, largo e pesado)
  + **Onest** (corpo), ambas via `next/font/google` em `app/layout.tsx`.
- Hero em camadas: "BIRO" atrás do retrato recortado (`public/branding/biro-cutout.webp`).
  Desktop com letras espaçadas; no celular, BIRO junto. Alinhar texto medindo a tinta pixel
  a pixel — a caixa do canvas erra em algumas fontes.
- Ordem da Home: Hero → Showreel → Trabalhos → Sobre → Clientes → Como trabalho → Contato.
- "Como trabalho" = timeline de editor, sticky. Timecode fixo no pé da tela (some no hero e
  dentro do Como trabalho).
- `/work` = palco 3D de cartões 9:16 flutuando, **só vídeos verticais** (a página filtra
  `format === "9:16"`). Capas do YouTube `oar2.jpg` com fallback maxres/sd/hq.
- Clientes: logos brancos em `public/clients/`, marquee que não pausa no hover.
- Contatos: WhatsApp, e-mail e YouTube (sem Vimeo).
- Acessibilidade mantida: `:focus-visible`, skip link, reduced-motion, modal com focus trap.

Testados e **removidos a meu pedido** (não trazer de volta): scrub de quadros nos cards,
botão de som / qualquer áudio no site.

## 6. Pendências

- **Minhas (conteúdo):** showreel, escolha dos trabalhos e de quais vídeos entram no
  `/work`, texto do Sobre, textos das etapas do Como trabalho, títulos "a confirmar",
  categorias em inglês, cliente dos vídeos imobiliários avulsos, logo em vetor.
- **Intro em vídeo (combinada em 2026-09-24, aguardando meu vídeo):** 3–5s em tela cheia,
  mudo, antes do hero; no fim dissolve "em areia" feito em código (WebGL: noise threshold +
  deslocamento + blur, sem lib nova), revelando o hero, cujas animações só começam depois.
  Só na 1ª visita; botão "Pular" + clique/scroll/tecla pulam; pula se não tocar em ~1,5s;
  reduced-motion pula. Specs: MP4 H.264 1920×1080 (opcional 1080×1920), ação no centro,
  último quadro escuro perto de `#030807`, sem som.
- `/cases` ainda no visual antigo. Domínio próprio (opcional).

## 7. Armadilhas conhecidas

- **Windows + Next:** não rodar `npm run build` com o `dev` ligado — corrompe `.next`
  (ENOENT `_buildManifest.js.tmp`). Parar o dev, apagar `.next`, reiniciar.
- **Testar animação:** o painel de preview oculto não roda `requestAnimationFrame`. Usar
  Edge headless com `--remote-debugging-port` (driver CDP em node, screenshots por
  `Page.captureScreenshot`). Largura real de celular se confere no painel com o preset
  mobile.
- **Git:** o repo não tem autor configurado. Commitar com
  `git -c user.name="Guilherme Conduta" -c user.email=gconduta.araujo@gmail.com commit ...`
- **Branches:** o trabalho acontece em `redesign/v4`, que é o que está em `origin/main`
  (produção). A `main` local está desatualizada — não partir dela.

## 8. Como trabalhar comigo

- Sou editor de vídeo, não engenheiro. Explique trade-offs pela consequência prática.
- Uma fase/pedido por vez. Antes de mudança grande, apresente o plano e espere aprovação.
- Se algo aqui estiver errado ou desatualizado, corrija este arquivo no mesmo commit.
