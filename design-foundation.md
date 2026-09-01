# Design Foundation — BIRO.MOV (v3)

Direção atual: **gabrielside.com** (valores reais extraídos) — acento continua menta.
gabrielside.com**. Substitui a v2 (phthalo/Satoshi/circular).

**Leitura em uma frase:** near-black quente, tipografia Poppins fina e elegante, acento
menta, texturas sutis (linhas de onda + glow), estrutura com números/stats e eyebrows com
traço.

---

## 0. Marca

`biro.mov` (minúsculo no site) · `.mov` em menta · descritor `FILMMAKER & EDIÇÃO`.
Slogan: `CONTEÚDO VISUAL COM RITMO E DIREÇÃO`. Rodapé: `AUDIOVISUAL · EDIÇÃO · DIREÇÃO · STORYTELLING`.
Assinatura: `Guilherme Conduta Araujo · Joinville/SC`.

---

## 1. Cor (v3 — da `.dc.html` do usuário)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#070707` | fundo (near-black quente) |
| `--bg-soft` | `#0c0c0c` | cards de vídeo |
| `--surface` | `rgba(244,242,236,0.03)` | cards |
| `--surface-hover` | `rgba(167,246,197,0.055)` | hover de card |
| `--card-border` | `rgba(244,242,236,0.08)` | borda de card |
| `--hairline` | `rgba(244,242,236,0.065)` | divisor de seção |
| `--accent` | `#A7F6C5` | acento único (menta) |
| `--accent-hi` | `#D8FCE5` | hover do acento |
| `--text-hi` | `#F4F2EC` | títulos (ivory quente) |
| `--text` `#C9D0CB` · `--text-dim` `#9AA39D` · `--text-mute` `#8A918C` · `--edge` `#6E756F` | texto |

- **Glow** (`--glow`): `radial-gradient(60% 55% at 50% 42%, rgba(167,246,197,0.09), transparent 70%)` — Hero, Contact.
- **Waves** (`--waves`): SVG de 3 linhas de onda, `stroke-opacity 0.055` — textura de fundo.
- Tema dark único.

---

## 1b. Sistema gabrielside (v3.1 — valores extraídos do site)

| | valor |
|---|---|
| Display | **Outfit** 400–900 (headlines 800–900, `-0.03/-0.035em`) |
| Corpo | **Inter** 300–500 |
| Labels/eyebrow/nº | **JetBrains Mono** 400–500, uppercase, `letter-spacing 0.24em` |
| bg | `#020202` · painel/stats/cards `#141418` |
| texto | creme `#EFE5D1` (títulos) · `#C9C9CE` corpo · `#A0A0A8` mudo |
| acento | `#A7F6C5` menta (gabrielside usa dourado; nós mantemos menta) |
| eyebrow | `— LABEL` mono, menta, caixa alta |
| botões | pill uppercase mono · solid menta / ghost `#141418` + borda `rgba(menta,.3)` |
| cards | `#141418` + `1px rgba(menta,.12)`, raio 12, padding 40/32 |
| stats | faixa full-bleed `#141418`, números Outfit 900 |
| section head | alinhado à esquerda (Contact centrado) |

## 2. Tipografia — Poppins, pesos leves

- **Poppins** (`next/font/google`, 200/300/400/500/600 + itálico 300).
- Corpo `font-weight: 300`. Títulos `font-weight: 300`, `letter-spacing: -0.03em` (hero
  `-0.037em`), `line-height ~1.05`, `text-wrap: balance`.
- **Headlines em 2 tons** (ivory + `<b>` menta, ambos peso 300) — ex. "Marcas em
  **movimento**".
- Números de stats: `font-weight: 200`, `-0.04em`, `tabular-nums`.

---

## 3. Estruturas assinatura

- **Eyebrow** = `— LABEL` (traço curto da gabrielside via `::before`) + `letter-spacing:
  0.22em`, caixa alta, cor menta (ou `--text-mute` com `.eyebrow--mute`).
- **Section head** centrado: eyebrow → `h-section` fina → `lead` (`max-width ~62ch`).
- **Stats** (`components/site/Stats.tsx` + `Counter.tsx`): 4 números com contagem animada
  (IntersectionObserver + `requestAnimationFrame`, cúbica), `border-top` menta 0.22,
  respeita `prefers-reduced-motion`. Dados reais do catálogo: clientes, projetos, vídeos,
  formatos.
- **Process** = grade de 4 (formato C.E.N.A. da `.dc.html`): `border-top` menta, número
  fino menta, título caixa-alta pequeno, texto mudo.
- **Botões**: `.btn--solid` (ivory → menta no hover) · `.btn--ghost` (borda hairline →
  menta). Pills.
- **Hero**: imagem de fundo a 0.28 + waves + glow + scrim; headline 2 tons; dual CTA;
  indicador `SCROLL` com filete.
- **Cards** (`.card`): `--surface` + borda hairline → hover tinta menta.
- Raios: `--r-card 18px` · `--r-lg 22px` · pills.

---

## 4. Base de qualidade (mantida da v2 — palette-agnostic)

`:focus-visible` global · skip link + `id="main"` · `color-scheme:dark` + `theme-color` ·
`prefers-reduced-motion` reset · `scroll-margin-top` · modal `/work` com focus trap +
restauração + `aria-labelledby` + `overscroll-behavior` · filtros com `aria-pressed` /
`aria-live` / URL query params · thumbs `<img loading=lazy>` · `translate="no"` na marca.

---

## 5. Fotografia

`public/branding/hero.jpg` (Biro c/ câmera) — Hero (fundo a 0.28) + About.
`public/branding/filmmaker.jpg` — reserva.

---

## 6. Pendências

- `/work` e `/cases` ainda no CSS da v2 — restilizar para a linguagem v3.
- Contadores: definir os números "oficiais" (hoje = contagem do catálogo).
- Logo/wordmark em vetor.
- Textura de água esmeralda (se ainda quiser) em alta.
- Curadoria + textos `[colchetes]`.
