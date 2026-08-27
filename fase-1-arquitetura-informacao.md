# Fase 1 — Arquitetura da Informação, Sitemap e Home

**Portfólio Biro** · documento textual · sem UI, sem wireframe visual, sem código.
Base: `portfolio-biro-etapa1.md` (§1–§3) + `PLAN.md` (Fase 1).

**Status:** proposta para sua aprovação. O tratamento visual de tudo aqui é trabalho da
Fase 4 (Design). Esta fase decide **o que existe, onde vive e para que serve** — não como parece.

---

## 1. Arquitetura da informação (definitiva proposta)

### 1.1 Princípio organizador

O site tem **dois modos de leitura**, e cada conteúdo pertence a um deles:

| Modo | Para quê | Onde | Conteúdo |
|------|----------|------|----------|
| **Narrativa** (scroll) | Convencer quem chegou frio, na ordem que você controla | `/` (Home) | As 8 seções, em sequência fixa |
| **Consulta** (navegação) | Quem já se interessou e quer explorar ou receber um link | `/work`, `/cases` | Biblioteca filtrável + cases profundos |

Regra: **se precisa de link compartilhável ou de profundidade, sai da Home e vira rota.**
Todo o resto é seção da Home.

### 1.2 Lógica do scroll da Home

`impacto → prova → oferta → prova profunda → método → pessoa → ação`

```
Hero            impacto — provar o nível em 3 segundos
Selected Work   prova — o trabalho é o argumento; vem antes de qualquer explicação
Clients         prova social — autoridade emprestada de quem confiou em você
What I Do       oferta — traduz o que se viu acima em áreas de contratação
Featured Cases  prova profunda — 2–4 histórias completas, material de DM
Process         método — reduz o risco percebido de contratar
About           pessoa — quem é o Biro, depois que o trabalho já convenceu
Contact         ação — um caminho claro para falar com você
```

### 1.3 Decisões de estrutura (fixas nesta proposta)

1. **Portfólio antes de serviços.** Selected Work é a seção 2; What I Do só vem depois.
2. **Clients é autoridade, não mural de logos.** Cada cliente entra com 1 linha de contexto
   ("quem é"). Não precisa listar todos — só os que emprestam autoridade.
3. **About perto do fim.** Só depois que o trabalho falou.
4. **Cases e biblioteca fora da Home.** Case profundo não cabe em seção; link de case é
   material comercial que você manda por DM.
5. **`/pricing` existe mas é invisível.** Rota e componente prontos, atrás de
   `pricingEnabled=false`. Sem link no menu, sem "Em breve", sem placeholder. Hoje responde
   404 e `noindex`.
6. **Detalhe de vídeo começa como modal** sobre `/work`. Rota própria (`/work/[slug]`) existe
   só para os vídeos que precisam de SEO individual — Selected e vídeos usados em case.
   *(a confirmar — item 20 do PLAN.md)*

---

## 2. Sitemap (definitivo proposto)

```
/                     Home — scroll narrativo, 8 seções, âncoras no menu
/work                 Biblioteca filtrável
/work/[slug]          Detalhe do vídeo — rota estática, só p/ Selected + vídeos de case
/cases                Índice de Featured Cases
/cases/[slug]         Case profundo, compartilhável
/pricing              Só renderiza se pricingEnabled=true. Hoje: 404 + noindex, sem link
```

Infra de SEO/social: `sitemap.xml`, `robots.txt`, cards Open Graph por rota indexável.

### 2.1 Rota a rota

| Rota | Renderização | Indexação | Comportamento |
|------|--------------|-----------|---------------|
| `/` | Estática (SSG) | Sim | Uma página; navegação por âncora entre as 8 seções; menu fixo |
| `/work` | Estática (SSG); filtros no cliente | Sim | Lista todos os vídeos com `tier` ∈ {selected, portfolio}. Filtros: categoria, formato, cliente, tag. `tier=archive` fica oculto por padrão (acessível só por filtro explícito) |
| `/work/[slug]` | Estática (SSG), gerada só para Selected + vídeos de case | Sim | Página do vídeo: player, título, descrição real, cliente, projeto, ano, papéis (`role`). `VideoObject` JSON-LD. Link "voltar para Work" |
| `/work` + modal | Modal sobre a lista, sem mudança de rota (ou `?v=slug` raso) | Não (é o mesmo `/work`) | Abre ao clicar num vídeo sem rota própria. Fecha com Esc / clique fora / voltar |
| `/cases` | Estática (SSG) | Sim | Índice dos projetos com `isCase=true` e `published=true`. Um teaser por case |
| `/cases/[slug]` | Estática (SSG) | Sim | Case completo: capa, resumo, blocos narrativos na sua voz, vídeos do projeto na ordem definida, métricas, créditos. `VideoObject` por vídeo embutido |
| `/pricing` | Condicional ao flag | `noindex` sempre enquanto gated | Com `pricingEnabled=false`: `notFound()`. Componente visual existe no repo, não é montado |

### 2.2 Menu / navegação

- **Menu fixo** (header): `Work` (rota) · `Selected` · `Clients` · `About` · `Contact` (âncoras da Home) + 1 CTA em destaque (leva a Contact).
- Em `/work`, `/cases` e `/cases/[slug]`, o mesmo header; as âncoras da Home passam a apontar para `/#selected`, `/#clients` etc.
- **Sem** link para `/pricing` em nenhum lugar enquanto o flag estiver falso.
- Rodapé: repetição dos contatos (WhatsApp, Instagram, e-mail) + link para `/work`.

### 2.3 Fluxos de navegação principais (textual)

1. **Frio → contato:** Home, scroll pelas 8 seções, CTA em Contact. Caminho primário.
2. **Interessado → explora acervo:** Home → clica "Work" no menu → filtra por categoria/cliente → abre modal de um vídeo → volta para a lista.
3. **Link recebido por DM:** abre direto em `/cases/[slug]` ou `/work/[slug]` → lê o case / vê o vídeo → header leva ao resto do site.
4. **Recrutador/curioso:** Home → âncora "About" → âncora "Contact".

---

## 3. As 8 seções da Home — função, conteúdo e dependências

Para cada seção: **objetivo**, **o que entra**, **comportamento** (só o que é estrutural —
o visual é da Fase 4), **dados que consome** e **o que ainda falta de você**.

### 3.1 Hero

- **Objetivo:** provar o nível em 3 segundos. É o filtro de primeira impressão.
- **O que entra:** 1 filme horizontal 16:9 (autoplay mudo, botão de som opcional), seu nome,
  a tagline, 1 CTA único.
- **Comportamento:** vídeo domina a tela e "respira" (pouco texto por cima). CTA leva a Contact.
  Som começa desligado; ligar é ação explícita do usuário.
- **Dados:** `site.json` → `heroVideoId`, `heroTagline`, `name`, `heroCtaLabel`.
- **Falta de você:** qual é o filme do Hero e se ele já está montado (item 10); a tagline e
  como você assina o nome (item 9).

### 3.2 Selected Work

- **Objetivo:** prova principal. É o argumento do portfólio inteiro.
- **O que entra:** 6 a 12 vídeos com `tier="selected"`, cada um respeitando seu formato
  (9:16 em pé, 16:9 deitado).
- **Comportamento:** grade/scroll que acomoda os dois formatos sem o vertical dominar a dobra
  (tratamento detalhado na Fase 4, §4.1 do PLAN). Preview no hover (desktop) / tap (mobile):
  poster → player só ao acionar. Clicar abre o detalhe (modal ou `/work/[slug]`). Link
  discreto "ver tudo" → `/work`.
- **Dados:** `videos.json` filtrado por `tier="selected"` e `status="published"`, ordenado por
  `order`.
- **Falta de você:** a curadoria da Fase 2 (quais vídeos são `selected`). **Não escolhemos
  agora.**

### 3.3 Clients

- **Objetivo:** autoridade emprestada. Quem confiou em você reduz o risco percebido.
- **O que entra:** clientes selecionados (`Client.featured=true`), cada um com nome/logo +
  **1 linha de contexto** ("quem é o cliente"). Não precisa mostrar todos.
- **Comportamento:** lista/mural onde a linha de contexto é parte do item, não tooltip.
  Ordenada por `Client.order`. Logo é opcional — nome + linha já bastam.
- **Dados:** `clients.json` onde `featured=true`, ordenado por `order`.
- **Falta de você:** a lista dos clientes a destacar e a linha de autoridade de cada (item 11).

### 3.4 What I Do

- **Objetivo:** traduzir o que se viu acima em **áreas de contratação**.
- **O que entra:** 3 a 4 **áreas de capacidade**. Cada uma: um rótulo, 1 linha de intenção e
  1 exemplo visual (um vídeo do catálogo ou uma imagem). **Não** é barra de skills com
  porcentagem.
- **Comportamento:** blocos curtos, um por capacidade. O exemplo visual puxa de um vídeo real
  quando `exampleVideoId` está preenchido. Se `pricingEnabled` virar `true` no futuro, cada
  bloco pode linkar para o pacote correspondente (`pricingRef`) — hoje, não.
- **Dados:** `capabilities.json`, ordenado por `order`; resolve `exampleVideoId` contra
  `videos.json`.
- **Falta de você:** quais são as 3–4 áreas, a frase de intenção de cada, e qual vídeo/imagem
  ilustra (item 12).

### 3.5 Featured Cases

- **Objetivo:** prova profunda. Teasers que levam ao material comercial completo.
- **O que entra:** 2 a 4 teasers de cases (`Case.featured=true`, `published=true`): capa,
  título, resumo de 1 linha, link para `/cases/[slug]`.
- **Comportamento:** cada teaser é um convite, não o case em si. O case inteiro mora em
  `/cases/[slug]`.
- **Dados:** `cases.json` onde `featured=true` e `published=true`, ordenado por `order`.
- **Falta de você:** quais 2–4 projetos viram case e o conteúdo narrativo de cada — desafio,
  abordagem, resultado, métricas, créditos (item 13). Depende também da Fase 2.

### 3.6 Process

- **Objetivo:** método. Mostrar que contratar você é um processo previsível.
- **O que entra:** uma sequência de etapas (timeline) **na sua voz**. Cada etapa diz
  explicitamente **o que o cliente recebe** ao fim dela.
- **Comportamento:** leitura linear no scroll, uma etapa após a outra. Conteúdo estático
  (não puxa do catálogo).
- **Dados:** `site.json` → `process[]` (`{ step, title, deliverable }`).
- **Falta de você:** as etapas e o entregável de cada (item 14).

### 3.7 About

- **Objetivo:** pessoa. Conexão depois que o trabalho convenceu.
- **O que entra:** texto curto em 1ª pessoa, 1 foto, sua visão sobre imagem e narrativa. Não
  é bio genérica de currículo.
- **Comportamento:** bloco curto, uma foto, sem sub-seções. Estático.
- **Dados:** `site.json` → `aboutText`, `aboutPhoto`.
- **Falta de você:** o texto e a foto (item 15).

### 3.8 Contact

- **Objetivo:** ação. Um caminho claro para falar com você.
- **O que entra:** CTA forte + WhatsApp + Instagram + e-mail. **Sem formulário complexo.**
  Opcional: uma linha de disponibilidade/escassez perto do CTA ("agenda aberta para X
  projetos").
- **Comportamento:** links diretos (WhatsApp abre conversa, e-mail abre `mailto:`, Instagram
  abre o perfil). A linha de escassez, se existir, é texto editável em `site.json`, não algo
  dinâmico.
- **Dados:** `site.json` → `whatsapp`, `instagram`, `email`, `availabilityNote?`.
- **Falta de você:** os três contatos; e a decisão sobre a linha de escassez — usar ou não, e
  com que texto (item 16).

---

## 4. O que fica FORA da Home (e por quê)

| Conteúdo | Onde vai | Por quê |
|----------|----------|---------|
| Acervo completo de vídeos | `/work` | Não cabe em seção; precisa de filtro e de link |
| Case detalhado | `/cases/[slug]` | Profundidade + é link que você manda por DM |
| Índice de cases | `/cases` | Página de consulta, separada da narrativa |
| Detalhe de um vídeo | Modal em `/work` ou `/work/[slug]` | Zoom pontual, não interrompe o scroll |
| Preços | `/pricing` (gated) | Fora de escopo público até você ligar o flag |

---

## 5. Pontos desta proposta que preciso que você aprove ou ajuste

1. **Ordem das 8 seções da Home** — mantida exatamente como o briefing §3. Confirma ou muda?
2. **Sitemap** — 6 rotas (`/`, `/work`, `/work/[slug]`, `/cases`, `/cases/[slug]`, `/pricing`
   gated). Confirma?
3. **Detalhe de vídeo:** modal para todos + rota própria (`/work/[slug]`) só para Selected e
   vídeos de case. Concorda, ou quer rota para todos os vídeos (mais SEO, mais páginas para
   manter)?
4. **`tier=archive` oculto por padrão em `/work`**, acessível só por filtro explícito.
   Confirma?
5. **Menu:** `Work · Selected · Clients · About · Contact` + CTA. Falta alguma âncora
   (ex.: "Cases", "Process")?
6. **Linha de escassez/disponibilidade** em Contact — usar? (opcional no briefing)

As 6 categorias candidatas do §4 (Social Films, Commercial/Sales, Brand/Institutional,
Interviews, Real Estate/Architecture, Special Projects) também precisam do seu aval, mas isso
se confirma de verdade **no inventário** (Fase 2), contra os vídeos reais.

---

## 6. Próximo passo

- **Você:** revisa este documento (pontos do §5) e me manda **URL do canal** + **export/lista
  dos vídeos**.
- **Eu, com sua aprovação + o export:** abro o **inventário da Fase 2** — tabela de todos os
  vídeos na estrutura de dados, com `category`/`clientId`/`format` sugeridos por mim e as
  colunas `grade`/`tier` prontas para você marcar.
- Repositório, dependências e Design continuam **parados** até Fase 1 e Fase 2 aprovadas.
