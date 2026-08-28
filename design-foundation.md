# Design Foundation — BIRO.MOV (v2 — identidade circular)

Base: brand board `Branding/branding.png` + **novo mockup de identidade** (mockup de
identidade visual do usuário, 2026-08-27) + textura de referência (água esmeralda aérea).
Alimenta a Fase 4/5 (Design).

**Leitura em uma frase:** emerald cinematográfico + **estilo circular** — orbes iridescentes,
badges redondos, monograma B em círculo. Satoshi geométrico. Um único acento menta.

---

## 0. Marca

| | |
|---|---|
| Nome | **BIRO.MOV** — `BIRO` + `.MOV` menta (site). Big treatment do mockup usa só `BIRO`. |
| Descritor | `FILMMAKER & EDIÇÃO` |
| Monograma | **B em círculo** (`.b-mark` no código) — o "estilo circular" que o usuário curtiu |
| Slogan | `CONTEÚDO VISUAL COM RITMO E DIREÇÃO` |
| Rodapé | `AUDIOVISUAL · EDIÇÃO · DIREÇÃO · STORYTELLING` |

---

## 1. Cor — v2.1 (Phthalo Green forward)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#05100C` | canvas (phthalo-black) |
| `--surface` | `#0A2019` | cards (phthalo escuro) |
| `--surface-2` | `#0C2C23` | painel |
| `--phthalo` | `#0C3B30` | **assinatura** — verde phthalo profundo |
| `--jade` | `#124A3B` | phthalo mais claro — washes de seção |
| `--teal` | `#0A6A5A` | ponte viva — borda ativa, stop de gradiente, filete de tópico |
| `--accent` | `#9FCBB4` | menta suave (acento único) |
| `--accent-hi` | `#C7E3D4` | hover do acento |
| `--text-hi` | `#F2F7F3` · `--text` `#DCE8E1` · `--text-mute` `#7C938A` | texto |
| `--hairline` | `rgba(159,203,180,.14)` | bordas 1px |

`section--jade` = wash phthalo `#082019 → #05130F`.

**Gradiente iridescente / motion colors** (`--iridescent`): cônico
`#0C3B30 → #0A6A5A → #6F7FB6 (lavanda) → #E3B78F (pêssego) → #A7D8C2 → #0C3B30`.
Usado: **borrado** em orbes (hero, contato) e **nítido** nos tiles da seção Motion Color.

Tema **dark único**.

> Nota do usuário: a paleta do mockup de identidade foi exploratória; a direção real é
> **Phthalo Green**. Ajustada nesta v2.1.

---

## 2. Tipografia — Satoshi, família única

- **Satoshi** (self-hosted `public/fonts/`, `next/font/local`, pesos 400/500/700/900).
  Sistema de **uma família só** — Inter removida (fonte "default" demais; `frontend-design`
  + `ui-ux-pro-max` recomendam single-family precision system aqui).
- Ladder: **900** hero · **700** títulos de seção · **500** labels/eyebrow · **400** corpo.
- `--font-display` = `--font-body` = Satoshi.
- Contraste editorial: display gigante e apertado (tracking −2 a −3px) vs eyebrow minúsculo
  espaçado (+3px, caixa alta). `text-wrap: balance` em títulos, `pretty` em parágrafos.

---

## 3. Estilo circular (o que o usuário pediu mais)

- **`.b-mark`** — B em círculo com borda menta. Header + footer.
- **`.icon-badge`** — círculo `--surface-2` + borda hairline, ícone de linha menta centrado.
  Usado no What I Do.
- **`.orb`** — círculo com `--iridescent` borrado. Hero (bleed pela direita), Contact (atrás
  do título).
- **`.play-ring`** / play dos cards — círculo com anel menta.
- Raios maiores: `--r-card: 22px`, `--r-lg: 30px`, pills em tudo.

## 3b. Ícones (set do mockup — `components/icons.tsx`)

Traço 1.5, grid 24, `currentColor` (menta no badge): **IconFilm** (edição/filmstrip),
**IconColor** (color grading / círculos sobrepostos), **IconAudio** (waveform),
**IconMotion** (sparkle). + IconFrame (direção), IconBuilding (imobiliário), IconPlay.

## 3c. Separação de tópico (ref. bento do mockup)

`.topic` = eyebrow (caixa alta, +3px) → `.topic__rule` (filete 48×2px, gradiente
`accent → teal`) → `.h-section`. Aplicado em todas as seções.

## 3d. Motion Color (seção nova)

Faixa de 5 tiles de gradiente entre Process e About:
verde `#0C3B30→#0A6A5A` · teal→menta · **iridescente** (animado, drift 18s) · lavanda→pêssego
`#6F7FB6→#E3B78F` · phthalo escuro. `aria-hidden`, respeita `prefers-reduced-motion`.

---

## 4. Forma e movimento

- Bordas antes de sombra. Cards dark separados por `--hairline`.
- HUD de filmagem mantido (REC dot, timecode, SEQ, colchetes de enquadramento) — convive com
  o circular.
- Movimento contido: fade + subida no scroll, hover de card = escala + borda menta.

---

## 5. Fotografia / textura

- `public/branding/hero.jpg` (Biro c/ câmera) — Hero + About.
- `public/branding/filmmaker.jpg` (silhueta gimbal neon) — fundo do Process.
- Textura de água esmeralda (ref. do usuário) — **não embutida** (sem arquivo); o mood dela
  está na paleta v2 e nos orbes. Se o usuário mandar o arquivo, entra como fundo do Hero.

---

## 6. Base de qualidade (aplicada — commit `2e79d0d`)

Guiada por `frontend-design`, `ui-ux-pro-max` e Web Interface Guidelines (Vercel):
`:focus-visible` global · skip link + `id="main"` · `color-scheme:dark` + `theme-color` ·
`prefers-reduced-motion` reset global · `scroll-margin-top` nas âncoras ·
modal com focus trap + restauração + `aria-labelledby` + `overscroll-behavior` + trava de
scroll · filtros com `aria-pressed` / `aria-live` / URL em query params · thumbs `<img
loading=lazy>` · `translate="no"` na marca. Removido: linha falsa de câmera no Hero
("data slop"); índice numérico dos cards (não era sequência) → tag de formato.

## 7. Pendências

- Monograma/logo novo em vetor (hoje `.b-mark` é CSS).
- Textura de água esmeralda em alta (fundo do Hero).
- Contraste "card claro sobre o dark" do bento — não aplicado.
- `/work/[slug]` estático + VideoObject no modal (SEO por vídeo).
- Curadoria + textos ([colchetes]).
