# PLAN.md — Portfólio Biro

## Contexto

**Por que este plano existe:** o briefing `portfolio-biro-etapa1.md` fechou a *estratégia*
(Etapa 1). Falta transformar essa estratégia num roteiro executável: fases com entrada,
saída e critério de aceite, para que Inventário → Design → Código só comecem com a etapa
anterior aprovada.

**Fonte de verdade:** `portfolio-biro-etapa1.md` (nesta pasta).
Este PLAN.md **não altera** o briefing — consolida, audita e estende onde você pediu
(6 entidades de dados em vez das 3 do §5). Toda extensão está marcada como *proposta a revisar*.

### Decisões travadas

| Tema | Decisão | Origem |
|------|---------|--------|
| Stack | **Next.js** (App Router) | §8.5 — confirmado |
| Catálogo | **JSON versionado no repo** — **sem CMS, nunca no v1**; todo conteúdo editado via Claude Code | risco #4 — confirmado 2026-08-27 |
| Inventário | **Você manda o export/lista** dos vídeos do canal | risco #1, opção (b) |
| Repositório | **Novo repo git nesta pasta** (`Desktop\portifólio`) | confirmado |
| Marca | **BIRO.MOV** · Poppins · paleta jade-preto + menta `#A7F6C5` · dark único · HUD de filmagem | `design-foundation.md` |
| Edição de conteúdo | Sempre via Claude Code (o usuário pede aqui). Deploy automático a cada mudança. | confirmado 2026-08-27 |

### O que este plano NÃO faz

- Não desenvolve frontend, não instala dependências, não cria componentes.
- Não inicializa o repositório ainda.
- Não escolhe os vídeos de Selected Work / Featured / destaques.
- Não fixa classificação definitiva de categoria/cliente/grade — tudo passa pela sua revisão.
- Não avança para nenhuma fase de implementação sem sua aprovação explícita.

---

## Fase 0 — Auditoria do briefing

### 0.1 Requisitos firmes (extraídos do briefing, não negociáveis)

1. Home = **uma página de scroll narrativo** com 8 seções na ordem
   `Hero → Selected Work → Clients → What I Do → Featured Cases → Process → About → Contact` (§1, §3).
2. **Rotas dedicadas** para o que precisa de link compartilhável: `/work`, `/work/[slug]`,
   `/cases`, `/cases/[slug]`, `/pricing` (§2).
3. `/pricing` existe mas fica **gated por `pricingEnabled=false`**: rota e componente prontos,
   **não renderizados nem linkados**, sem "Em breve" (§2, §8.7).
4. Menu fixo = âncoras da Home + link "Work" (§2).
5. Vídeos vêm do **YouTube por embed/ID**. Nunca duplicar arquivo (§5).
6. **9:16 em pé, 16:9 deitado** — o layout respeita o formato, o vertical não pode ficar feio (§3).
7. Detalhe de vídeo **começa como modal** sobre a biblioteca; vira rota só se houver SEO por vídeo (§2).
8. Clients = **autoridade**, não fileira de logos: nome/logo + 1 linha de contexto; não precisa mostrar todos (§1, §3).
9. What I Do = **3–4 áreas de capacidade**, com 1 linha de intenção + exemplo visual.
   **Não** barra de skills com % (§3).
10. Curadoria em **tiers** (Selected / Portfolio / Archive) = filtros sobre a mesma base, não bases separadas (§4).
11. Grade **A/B/C é interna, nunca pública** (§4, §5).
12. Contact sem formulário complexo: WhatsApp + Instagram + e-mail (§3).
13. Sequência de trabalho: cada etapa só começa com a anterior aprovada (§7).
14. Performance: embed de vídeo carrega thumb primeiro, player só no play (§8.3).

### 0.2 Dependências (o que trava o quê)

```
Inventário (Fase 2)  ← você manda: URL do canal + export/lista dos vídeos
Categorias aprovadas ← sua revisão do §4
Curadoria A/B/C + tier ← sua marcação vídeo a vídeo, após o inventário
Design (Fase 4)      ← inventário fechado + categorias aprovadas + curadoria feita
Código (Fase 5)      ← design aprovado + dados reais no JSON
Data layer (Fase 3)  ← este plano aprovado (não depende do design)
SEO VideoObject      ← título/descrição reais por vídeo (não necessariamente os do YouTube)
Poster frames 9:16   ← sua decisão (risco #2) + acesso aos vídeos para extrair frames
Deploy (Fase 6)      ← domínio + escolha de analytics
```

### 0.3 Lacunas e indefinições encontradas (a resolver com você)

| # | Ponto em aberto | Onde nasce | Proposta neste plano |
|---|-----------------|-----------|----------------------|
| L1 | Briefing modela 3 entidades; você pediu 6 (add `Category`, `Case`, `Capability`) | §5 vs seu pedido | Promover as 3 novas — ver Fase 3. **Revisar.** |
| L2 | Formato `"other"` existe no schema mas nunca especificado (1:1? 4:5?) | §5 | Confirmar se há esses formatos no acervo; senão manter só `9:16`/`16:9`. |
| L3 | Detalhe de vídeo: modal x rota própria | §2, §8.6 | Modal para todos + rota estática `/work/[slug]` só para Selected e vídeos de case (SEO). **Confirmar.** |
| L4 | Grade/`status` privados podem vazar no JSON servido ao cliente | §4, §5 | Build gera um catálogo público *sem* `grade`, `status:draft/hidden`, notas internas. Decisão técnica, registrada. |
| L5 | Conteúdo de Process, About, Contact não existe no briefing | §3 | Precisa vir de você (ver Fase 11). |
| L6 | Identidade visual (cor, tipografia, logo, tagline) inexistente | — | Trabalho da Fase 4 (Design). |
| L7 | Hospedagem, domínio, analytics indefinidos | §8.7 | Proposta: Vercel + (GA4 ou Plausible). **Decisão sua.** |
| L8 | Export manual fica caro se o acervo for grande | risco #1 | Se passar de ~80 vídeos, reabrir a opção da YouTube Data API. |
| L9 | Idioma | — | Assumo **pt-BR único** no v1. Confirmar. |
| L10 | Bloco de escassez/disponibilidade perto do CTA | §3 fim | Opcional. **Decisão sua** (sim/não + texto). |
| L11 | Vídeo do Hero: qual é, já existe montado? | §3 | Precisa vir de você. |
| L12 | Vocabulário fixo de `role` (direção/edição/cor…) | §5 | Propor lista fechada no inventário, você confirma. |

---

## Fase 1 — Fundação de informação (IA + sitemap + Home)

**Entrada:** este plano aprovado.
**Saída:** documento textual (sem UI) — IA definitiva, sitemap, tabela final das 8 seções.
**Sem código, sem wireframe visual.**
**Entregue em:** `fase-1-arquitetura-informacao.md`

### 1.1 Arquitetura da informação (definitiva proposta)

Mantém a do briefing §1, sem mudança de mérito:

- **Home = scroll narrativo único**, lógica `impacto → prova → oferta → prova profunda → método → pessoa → ação`.
- **Rotas dedicadas** só para o que precisa de profundidade + link compartilhável: biblioteca (`/work`) e cases (`/cases`).
- **Modal** para detalhe de vídeo (rota estática reservada para SEO — L3).
- **`/pricing` isolado atrás de flag**, fora do menu, sem placeholder.
- Hierarquia: o **trabalho é o argumento** — portfólio antes de serviços; About perto do fim.

### 1.2 Sitemap (definitivo proposto)

```
/                     Home — scroll narrativo, 8 seções, âncoras no menu
/work                 Biblioteca filtrável (tags, formato, cliente, categoria, tier)
/work/[slug]          Detalhe do vídeo — rota estática só p/ Selected + vídeos de case
                      (demais vídeos: modal sobre /work, sem rota)
/cases                Índice de Featured Cases
/cases/[slug]         Case profundo, compartilhável
/pricing              Renderiza só se pricingEnabled=true. Hoje: 404 + noindex, sem link
sitemap.xml, robots.txt, /og/* (cards sociais)
```

Menu fixo: `Work · Selected · Clients · About · Contact` (âncoras) + destaque no CTA.

### 1.3 Seções da Home — função de cada uma

| # | Seção | Função no funil | Conteúdo mínimo | Depende de |
|---|-------|-----------------|-----------------|-----------|
| 1 | **Hero** | Impacto imediato; provar nível em 3s | 1 filme 16:9 (autoplay mudo, som opcional), nome, tagline, 1 CTA | L11, tagline (Fase 11) |
| 2 | **Selected Work** | Prova principal; é o argumento | 6–12 vídeos, grid que respeita 9:16/16:9, preview no hover/tap | Curadoria (Fase 2) |
| 3 | **Clients** | Autoridade emprestada | Clientes selecionados: nome/logo + 1 linha de contexto | Lista + linhas (Fase 11) |
| 4 | **What I Do** | Traduz o trabalho em oferta | 3–4 áreas de capacidade: 1 linha de intenção + exemplo visual | Definição das áreas (Fase 11) |
| 5 | **Featured Cases** | Prova profunda; material comercial | 2–4 teasers → `/cases/[slug]` | Cases (Fase 2 + 11) |
| 6 | **Process** | Método; reduz risco percebido | Timeline na sua voz; cada etapa = o que o cliente recebe | Texto (Fase 11) |
| 7 | **About** | Pessoa; conexão | 1ª pessoa, foto, visão sobre imagem e narrativa. Curto | Texto + foto (Fase 11) |
| 8 | **Contact** | Ação | CTA forte, WhatsApp + Instagram + e-mail, sem formulário. Escassez opcional | Contatos (Fase 11), L10 |

### 1.4 Critério de aceite da Fase 1

Você aprova o documento de IA + sitemap + tabela de seções (ou marca ajustes).
Nada avança sem isso.

---

## Fase 2 — Inventário e taxonomia

**Entrada:** URL do canal + export/lista dos vídeos (você) + Fase 1 aprovada.
**Saída:** tabela/planilha de inventário com todos os vídeos na estrutura de dados,
pronta para você marcar grade e tier.

### 2.1 Taxonomia inicial (proposta — NÃO definitiva)

Cópia fiel do §4, marcada como hipótese até o inventário:

**Categorias candidatas:**
`Social Films` · `Commercial / Sales` · `Brand / Institutional` · `Interviews` ·
`Real Estate / Architecture` · `Special Projects`

**Eixos de filtro na biblioteca:**
- Categoria (acima)
- Formato: `9:16` · `16:9` · `other` (L2)
- Cliente
- Tier: `Selected` · `Portfolio` · `Archive`

**Tiers = filtros sobre a mesma base:**
- `Selected` — os 6–12, aparecem na Home.
- `Portfolio` — seleção ampla, aparece em `/work`.
- `Archive` — catalogado, oculto por padrão.

**Grade interna A/B/C** (nota sua, nunca pública): A = representa forte seu nível hoje ·
B = complementar · C = não usar.

### 2.2 O que eu preencho x o que você marca

| Campo | Quem |
|-------|------|
| `youtubeId`, `url`, `title`, `format`, `year`, `thumbnail` | Eu, a partir do seu export |
| `category` (sugestão), `clientId` (sugestão), `projectId` (agrupamento) | Eu sugiro |
| `grade` (A/B/C), `tier`, confirmação de `category`/`clientId`, `role[]` | **Você** |
| `description` real (para SEO), `tags[]` | Nós dois, na curadoria |

### 2.3 Critério de aceite da Fase 2

100% dos vídeos do export presentes na tabela; nenhum com `category` vazio;
`grade` e `tier` preenchidos por você; categorias do §4 confirmadas ou ajustadas.

---

## Fase 3 — Modelo de dados (camada de conteúdo)

**Entrada:** este plano aprovado (independe do design).
**Saída:** `lib/types.ts` + `content/*.json` + validação `zod` no build.
Repositório é inicializado aqui (Next.js scaffold mínimo, sem UI).

### 3.1 Seis entidades (as 3 do §5 + 3 promovidas — *revisar*)

As três do briefing ficam **como estão** (`Client`, `Project`, `Video` do §5).
Abaixo só as adições e os ajustes de ligação.

```ts
// === do briefing §5, sem alteração de mérito ===
// Client  { id, name, logo?, context?, featured, order }
// Project { id, clientId|null, name, year?, isCase, caseSlug?, order }
// Video   { id, youtubeId, url, title, description?, thumbnail, clientId|null,
//           projectId|null, category, format:"9:16"|"16:9"|"other", year?, tags[],
//           tier:"selected"|"portfolio"|"archive", grade:"A"|"B"|"C",
//           role?[], featured, order, status:"published"|"draft"|"hidden" }

// === PROMOVIDO (proposta a revisar) ===

interface Category {
  id: string;          // slug: "social-films"
  label: string;       // "Social Films"
  description?: string; // 1 linha do que define a categoria
  order: number;
  visible: boolean;    // aparece como filtro público
}
// Video.category passa a ser FK → Category.id (hoje é string livre no §5)

interface Case {
  id: string;
  slug: string;              // /cases/[slug]  (substitui Project.caseSlug como fonte)
  projectId: string;         // o projeto que o case detalha (Project.isCase = true)
  title: string;
  summary: string;           // teaser na Home e no índice /cases
  cover: string;             // imagem de capa própria (não thumb do YouTube)
  sections: {                // blocos narrativos na sua voz
    heading?: string;
    body: string;            // markdown
    media?: { type: "video" | "image"; ref: string }[];
  }[];
  videoOrder: string[];      // ordem dos Video.id do projeto dentro do case
  metrics?: { label: string; value: string }[];  // "direção que converte"
  credits?: { role: string; name: string }[];
  published: boolean;
  featured: boolean;         // teaser aparece na Home (seção 5)
  order: number;
}

interface Capability {       // "What I Do" — área de capacidade, NÃO skill com %
  id: string;
  label: string;             // "Direção", "Social Films", "Cor & finish"...
  intent: string;            // 1 linha de intenção
  exampleVideoId?: string;   // exemplo visual vindo do catálogo
  exampleImage?: string;
  order: number;
  pricingRef?: string;       // gancho para pacote em /pricing (gated), sem preço agora
}
```

**Relações (consolida §6):**
```
Client ──1:N── Project ──1:N── Video
Project (isCase=true) ──1:1── Case ──N── Video (via videoOrder)
Category ──1:N── Video
Capability ──0:1── Video (exemplo)  ·  Capability ──0:1── pricing package
```

### 3.2 Camada de dados — arquivos

```
content/
  clients.json      categories.json      capabilities.json
  projects.json     videos.json          cases.json
  site.json         # tagline, contatos, flags (pricingEnabled), textos de Process/About
public/posters/     # poster frames verticais próprios (9:16)
lib/
  types.ts          # as interfaces acima
  catalog.ts        # loader + join, import estático em build
  catalog.schema.ts # zod: valida os JSON no build; falha o build se quebrar
  public-catalog.ts # gera o catálogo servido ao cliente SEM grade/draft/notas (L4)
```

Script `npm run validate:catalog` → sai 0 se os JSON batem com o schema e as FKs resolvem.

### 3.3 Critério de aceite da Fase 3

`validate:catalog` passa; 3–5 vídeos reais do inventário carregam pelos tipos;
catálogo público não contém `grade` nem itens `draft/hidden`.

---

## Fase 4 — Design (Claude Design)

**Entrada:** inventário fechado + categorias aprovadas + curadoria A/B/C feita.
**Saída:** protótipo navegável aprovado + specs. **Antes de qualquer código de UI.**

### 4.1 Coexistência 9:16 × 16:9 (a resolver no Design, diretrizes já fixadas)

| Item | Diretriz |
|------|----------|
| Grid do Selected Work / `/work` | Layout misto: card 16:9 ocupa largura dupla, card 9:16 largura simples; **altura do vertical limitada** para não dominar a dobra |
| Proporção | Wrapper com `aspect-ratio` fixo por `format`; o player nunca define o tamanho |
| Poster | 9:16 usa **poster frame próprio** (`public/posters/`); 16:9 usa thumb do YouTube (`maxresdefault`/`hqdefault`) — risco #2 |
| Preview hover/tap | Poster → troca para player só no play; loop mudo curto se houver clipe de preview |
| Embed sem tarjas | `lite-youtube-embed` (facade) + `youtube-nocookie.com` + wrapper que esconde a moldura no 9:16 — risco #3 |
| Modal de vídeo | Layout do modal se adapta ao `format` (vertical centralizado, horizontal largo) |

### 4.2 Escopo do Claude Design

- Direção de arte e sistema visual: cor, tipografia, escala de espaçamento, grid, tokens.
- Layout e comportamento de **cada uma das 8 seções** da Home.
- Tratamento do vídeo vertical (4.1) — o entregável visual mais crítico.
- `/work`: layout dos filtros, chips de tag, estados (vazio, carregando, hover, foco/teclado).
- Comportamento do **modal** de detalhe de vídeo.
- Template de **Featured Case** (`/cases/[slug]`): ritmo de blocos, tipografia longa, métricas, créditos.
- Microinterações: scroll da Home, hover de preview, transições do modal.
- Header fixo com âncoras + link Work; tratamento do CTA.
- Bloco de escassez/disponibilidade opcional perto do CTA (L10).
- Aparência do componente de `/pricing` (visual pronto, permanece gated).

### 4.3 Critério de aceite da Fase 4

Protótipo navegável aprovado por você cobrindo: Home (8 seções), `/work` com filtros,
modal de vídeo, template de case, e o tratamento 9:16 × 16:9 lado a lado.

---

## Fase 5 — Desenvolvimento (Claude Code)

**Entrada:** design aprovado + dados reais no `content/*.json`.

### 5.1 Escopo do Claude Code

- Scaffold Next.js (App Router) + TypeScript + Tailwind (ou CSS Modules — o Design decide) no repo.
- Consumir a camada de dados da Fase 3; componentes reutilizáveis a partir do design.
- `lite-youtube-embed` facade + wrapper de proporção por `format`.
- Roteamento: Home com âncoras; `/work` + modal; `/work/[slug]` estático só p/ Selected + vídeos de case;
  `/cases` + `/cases/[slug]`; `/pricing` atrás de `pricingEnabled` (404 + `noindex`, sem link).
- SEO: Metadata API, **`VideoObject` JSON-LD** nas rotas de vídeo, `sitemap.xml`, `robots.txt`, OG cards.
- Analytics: GA4 ou Plausible (L7) — Plausible evita banner de cookie (LGPD).
- Performance: budget explícito, nenhum `<iframe>` do YouTube no HTML inicial, `next/image` nos posters.
- Build: geração do catálogo público sem campos internos (L4).

### 5.2 Critério de aceite da Fase 5

`npm run dev` roda; Lighthouse ≥ 90 em Performance/SEO/Best-Practices na Home e `/work`;
nenhum iframe do YouTube antes do play; `/pricing` invisível e não indexável;
`VideoObject` presente nas rotas de vídeo; catálogo público sem `grade`/`draft`.

---

## Fase 6 — SEO, analytics, deploy

**Entrada:** Fase 5 aprovada + domínio + escolha de analytics.
**Saída:** site no ar.

- Deploy (proposta: Vercel).
- Domínio apontado (L7).
- GA4 ou Plausible ativo (L7).
- `sitemap.xml` + `robots.txt` + OG cards validados.
- Checagem final de `VideoObject` no Rich Results Test.

---

## Separação de camadas (resumo — ponto 10)

| Camada | O que contém | Onde vive | Quem alimenta |
|--------|--------------|-----------|---------------|
| **Conteúdo / dados** | `content/*.json`, `lib/types.ts`, loader + `zod`, poster frames | Repo, fora da UI | Inventário + sua curadoria (grade, tier, categoria, cliente) |
| **Design** | Sistema visual, layout das 8 seções, tratamento do vertical, microinterações, template de case, estados | Claude Design → specs + protótipo | Fase 4, com dados reais já fechados |
| **Desenvolvimento** | Componentes React, rotas, embed facade, SEO/schema, analytics, flag de pricing, performance, deploy | Claude Code | Fase 5–6, com design aprovado |

Regra do §7 mantida: **design não começa sem curadoria fechada; código não começa sem design aprovado.**

---

## Claude Design x Claude Code (ponto 11)

| Claude Design | Claude Code |
|---------------|-------------|
| Cor, tipografia, tokens, grid | Scaffold Next.js + repo + TS |
| Layout e comportamento das 8 seções da Home | Camada de dados: tipos, loader, validação, ingest do export |
| Tratamento 9:16 × 16:9 (card, proporção, poster, hover) | `lite-youtube-embed` facade + wrapper de proporção |
| `/work`: filtros, chips, estados (vazio/loading/hover/foco) | Roteamento (Home âncoras, `/work` + modal, `/work/[slug]`, `/cases`, `/pricing` gated) |
| Modal de detalhe de vídeo | SEO: Metadata API, `VideoObject`, sitemap, OG |
| Template de Featured Case | Analytics (GA4/Plausible) + budget de performance |
| Microinterações e transições | Build do catálogo público sem campos internos |
| Header, CTA, bloco de escassez opcional | Deploy + domínio |
| Aparência do `/pricing` (gated) | Flag `pricingEnabled` (não renderiza / `noindex`) |

---

## Fase 11 — Informações que ainda preciso de você (ponto 12)

**Para destravar a Fase 2 (inventário):**
1. URL do canal do YouTube.
2. O export/lista dos vídeos (a página de vídeos do canal já serve).

**Para a Fase 1 / aprovação:**
3. Aprovar ou ajustar a ordem das 8 seções da Home.
4. Aprovar ou ajustar as 6 categorias candidatas do §4.

**Depois do inventário (curadoria):**
5. Marcar `grade` A/B/C e `tier` (Selected/Portfolio/Archive) de cada vídeo.
6. Confirmar `category` e `clientId` sugeridos por vídeo.
7. Confirmar o vocabulário fixo de `role[]` (ex.: direção, edição, cor, roteiro).
8. Toparia gerar **poster frames verticais próprios** para os 9:16 Selected? (risco #2, afeta curadoria)

**Conteúdo que não existe no briefing:**
9. Tagline do Hero + como você assina o nome.
10. Qual é o **filme do Hero** e ele já está montado?
11. **Clients:** lista dos clientes selecionados + a "1 linha de autoridade" de cada + quais são `featured`.
12. **What I Do:** quais 3–4 áreas de capacidade, a frase de intenção de cada, e o vídeo/imagem exemplo.
13. **Featured Cases:** quais 2–4 projetos viram case + o conteúdo narrativo de cada (desafio, abordagem, resultado, métricas, créditos).
14. **Process:** as etapas na sua voz + o que o cliente recebe em cada.
15. **About:** texto em 1ª pessoa + foto.
16. **Contact:** número do WhatsApp, @ do Instagram, e-mail. Usar bloco de disponibilidade/escassez? (sim/não + texto — L10).

**Decisões técnicas menores:**
17. Analytics: **GA4 ou Plausible?** (L7)
18. Domínio: qual? (L7)
19. Idioma: só **pt-BR** no v1? (assumo que sim — L9)
20. Detalhe de vídeo: confirma **modal + rota estática só para Selected/case**? (L3)
21. Existe algum formato além de 9:16 e 16:9 no acervo (1:1, 4:5)? (L2)

---

## Verificação (como cada fase se prova)

| Fase | Prova executável |
|------|------------------|
| 0 | Este PLAN.md aprovado por você. |
| 1 | Documento de IA + sitemap + tabela das 8 seções aprovado (texto, sem UI). |
| 2 | Tabela de inventário: 100% dos vídeos do export, nenhum `category` vazio, `grade`/`tier` preenchidos por você. |
| 3 | `npm run validate:catalog` sai 0; amostra real carrega; catálogo público sem `grade`/`draft`. |
| 4 | Protótipo navegável aprovado: Home (8 seções), `/work` + filtros, modal, template de case, 9:16 × 16:9. |
| 5 | `npm run dev` roda; Lighthouse ≥ 90 (Perf/SEO/BP) na Home e `/work`; zero iframe YouTube antes do play; `/pricing` invisível + `noindex`; `VideoObject` nas rotas de vídeo. |
| 6 | Site no domínio; analytics ativo; `sitemap.xml` + `robots.txt`; OG e Rich Results válidos. |

---

## Próxima ação concreta após aprovação deste PLAN.md

1. **Eu:** entrego a **Fase 1** — IA definitiva + sitemap + tabela final das 8 seções como
   **documento textual** (`fase-1-arquitetura-informacao.md`), ainda sem UI, sem repo, sem dependências.
2. **Você, em paralelo:** me manda (a) a **URL do canal** e (b) o **export/lista dos vídeos**,
   para eu abrir o inventário da Fase 2 na estrutura de dados da Fase 3.
3. **Nada de repositório, instalação ou Design** enquanto a Fase 1 e o inventário (Fase 2) não
   estiverem aprovados por você.
