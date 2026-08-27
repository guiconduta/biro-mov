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

## 1. Cor — v2 (emerald mais profundo)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#050D0A` | fundo (verde-quase-preto) |
| `--surface` | `#10130F` | cards |
| `--surface-2` | `#0F1F1B` | painel com tinta jade |
| `--jade` | `#123524` | seções profundas, stop de gradiente |
| `--teal` | `#076258` | **NOVO** — acento secundário, bordas ativas, stop de gradiente |
| `--accent` | `#9FCBB4` | menta suave (acento único) |
| `--accent-hi` | `#C7E3D4` | hover do acento |
| `--graphite` | `#1A1E1D` | neutro |
| `--text-hi` | `#F4F6F3` | títulos |
| `--text` | `#DFE6E1` | corpo |
| `--text-mute` | `#74857C` | eyebrow, meta, HUD |
| `--hairline` | `rgba(159,203,180,.13)` | bordas 1px |

**Gradiente atmosférico iridescente** (`--iridescent`): cônico
`#123524 → #076258 → #6F7FB6 (lavanda) → #E3B78F (pêssego) → #A7D8C2 → #123524`.
Usado **borrado** (`blur(60px)`) em orbes: hero, contato. É a assinatura visual nova.

Tema **dark único**.

---

## 2. Tipografia — Satoshi / Inter

- **Display / títulos:** `Satoshi` (self-hosted em `public/fonts/`, via `next/font/local`;
  pesos 400/500/700/900). Geométrica, moderna, precisa.
- **Corpo / UI:** `Inter` (`next/font/google`).
- Tokens: `--font-display`, `--font-body`.
- Contraste editorial: display gigante e apertado (tracking −2 a −3px, peso 900 no hero) vs
  eyebrow minúsculo espaçado (+3px, caixa alta).

---

## 3. Estilo circular (o que o usuário pediu mais)

- **`.b-mark`** — B em círculo com borda menta. Header + footer.
- **`.icon-badge`** — círculo `--surface-2` + borda hairline, ícone de linha menta centrado.
  Usado no What I Do.
- **`.orb`** — círculo com `--iridescent` borrado. Hero (bleed pela direita), Contact (atrás
  do título). É o "gradient atmosférico" do mockup.
- **`.play-ring`** / play dos cards — círculo com anel menta.
- Raios maiores: `--r-card: 22px`, `--r-lg: 30px`, pills em tudo.

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

## 6. Pendências

- Arquivo do monograma/logo novo em vetor (hoje `.b-mark` é recriado em CSS).
- Textura de água em alta, se for virar fundo.
- Aplicar o contraste "card claro sobre o dark" do mockup (bento) — ainda não feito no site.
- Curadoria + textos ([colchetes]).
