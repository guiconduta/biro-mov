# Design Foundation — BIRO.MOV (v3.1)

Direção: **sistema da gabrielside.com** (valores reais extraídos do site), com o **acento
menta `#A7F6C5`** da BIRO.MOV no lugar do dourado. Substitui todas as versões anteriores
(phthalo/Satoshi/circular; Poppins fina).

**Leitura em uma frase:** near-black, tipografia geométrica pesada (Outfit 900), texto
creme quente, acento menta, eyebrows mono com traço, faixa de stats.

---

## 1. Cor

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#020202` | fundo |
| `--panel` | `#141418` | faixa de Stats, cards |
| `--surface` | `#101014` | cards de vídeo |
| `--card-border` | `rgba(167,246,197,0.12)` | borda de card |
| `--hairline` | `rgba(239,229,209,0.08)` | divisor de seção |
| `--accent` | `#A7F6C5` | acento único (menta) |
| `--accent-hi` | `#D8FCE5` | hover |
| `--text-hi` | `#EFE5D1` | títulos (creme quente) |
| `--text` | `#C9C9CE` | corpo |
| `--text-dim` `#9AA0A0` · `--text-mute` `#A0A0A8` · `--edge` `#6E6E76` | texto secundário |

`--glow`: radial menta 0.08 → transparente (Hero, Contact). `--waves`: SVG de 3 linhas de
onda, `stroke-opacity 0.05` (textura de fundo). Tema dark único.

---

## 2. Tipografia (as 3 famílias da gabrielside)

- **Outfit** (`next/font/google`, 400–900) — display. Headlines **800–900**,
  `letter-spacing -0.03/-0.035em`, `line-height ~1.05`. Hero 900, section h2 800.
- **Inter** (300–600) — corpo. `.lead` peso 300.
- **JetBrains Mono** (400–500) — eyebrows, labels, nav, números de stats, botões.
  Uppercase, `letter-spacing 0.1–0.24em`.
- **Headlines 2 tons:** creme + `<b>` menta (mesmo peso). Ex.: "Marcas em **movimento**".

---

## 3. Componentes

- **Eyebrow:** `— LABEL` (traço via `::before`), JetBrains Mono, 12px, `0.24em`, caixa
  alta, cor menta (`.eyebrow--mute` = cinza).
- **Section head:** alinhado à **esquerda** (eyebrow → h2 → lead). `.sec-head--center`
  só no Contact.
- **Botões** (`.btn`): pill, mono uppercase, `0.1em`, peso 500. `.btn--solid` = menta /
  texto `#020202`. `.btn--ghost` = `#141418` + `1px rgba(167,246,197,0.3)`.
- **Cards** (`.card`): `#141418`, `1px var(--card-border)`, raio 12, hover borda menta +
  `translateY(-2px)`.
- **Stats** (`Stats.tsx` + `Counter.tsx`): faixa full-bleed `#141418`, números Outfit 900
  `clamp(40–62px)`, contagem animada (IntersectionObserver + rAF, cúbica, respeita
  `prefers-reduced-motion`). Dados: clientes, projetos, vídeos, formatos (do catálogo).
- **Hero:** foto de fundo a 0.28 + waves + glow + scrim; headline Outfit 900 2 tons; dual
  CTA (solid + ghost); indicador `SCROLL` com filete.
- **Process:** grade de 4, `border-top` menta, nº Outfit 900 menta, título mono caixa-alta.
- Raios: `--r-card 12px` · `--r-lg 16px` · pills `100px`.

---

## 4. Base de qualidade (mantida — palette-agnostic)

`:focus-visible` global · skip link + `id="main"` · `color-scheme:dark` + `theme-color` ·
`prefers-reduced-motion` reset · `scroll-margin-top` · modal `/work` com focus trap +
restauração + `aria-labelledby` + `overscroll-behavior` · filtros com `aria-pressed` /
`aria-live` / URL query params · thumbs `<img loading=lazy>` · `translate="no"` na marca.

---

## 5. Fotografia

`public/branding/hero.jpg` (Biro c/ câmera) — Hero (a 0.28) + About.
`public/branding/filmmaker.jpg` — reserva.

---

## 6. Pendências

- `/work` e `/cases` ainda no CSS antigo — restilizar para v3.1.
- Números "oficiais" das stats (incl. anos de estrada) — hoje = contagem do catálogo.
- Logo/wordmark em vetor.
- Curadoria + textos `[colchetes]` (hero sub, linhas de autoridade, About, availability).
- Dev-indicator do Next aparece no canto (só em dev, some no build).
