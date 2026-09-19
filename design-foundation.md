# Design foundation — BIRO.mov (v4 · Phthalo Green)

Fonte de verdade do visual da Home redesenhada. Substitui a v3.1.

## Identidade
Cinematográfico, contemporâneo, humano, preciso, imersivo, sensorial, autoral.
**Não** é: corporativo, SaaS, template, dashboard, futurista, card-heavy, neon.

## Paleta (tokens em `app/globals.css`)
- Fundo: `--bg #030807` (preto / verde extremamente escuro).
- Phthalo Green **só como luz**: glow, borda, hover, atmosfera (`--phthalo-glow #1f8f6a`, `--phthalo-mid #17654c`, `--phthalo-lit #4fd6a8` só para foco/detalhe minúsculo). Nunca bloco sólido grande, nunca azul dominante.
- Tipografia: off-white (`--text-hi #f2f4f1`).

## Tipografia
- Display (BIRO, títulos grandes): **Archivo**, eixo `wdth` (`font-stretch:112%`, peso 900 no BIRO).
- Corpo/UI: **Hanken Grotesk**, pesos finos (300) na navegação e nos textos editoriais.
- Ambas via `next/font/google` em `app/layout.tsx`.

## Hero em camadas (`components/site/Hero.tsx` + `app/home.css`)
1. Fundo: gradientes Phthalo + grão SVG (`.hero__bg`, `.hero__grain`).
2. BIRO em texto real (`<h1 aria-label="BIRO.mov">`), letra a letra (`.ltr`), atrás do retrato; `.mov` alinhado à direita.
3. Retrato recortado (`public/branding/biro-cutout.webp`, alpha) com rim light via `drop-shadow`. **Foto original do usuário, sem alteração de rosto.**
4. Textos, CTA, ícone de scroll — todos texto/HTML real.
- Entrada: keyframes CSS (`fig-in`, `brand-in` com máscara, `line-up`). Parallax leve via `--hero-p` (`HeroParallax`).
- Desktop: BIRO ~38.5svh, "I→R" escondido atrás do rosto (`--gap-i`). Mobile (<820px): composição própria, palco 56svh, cabeça cobre só a metade inferior das letras.

## Ordem da Home (fixa)
01 Hero · 02 Showreel · 03 Trabalhos · 04 Sobre · 05 Clientes e experiências · 06 Como trabalho · 07 Contato (+ Footer).

## Movimento
Helpers próprios, sem biblioteca: `Reveal` (IntersectionObserver), `Magnetic` (cap ~6px, só ponteiro fino), `HeroParallax`, nav headroom. Tudo respeita `prefers-reduced-motion`.

## Conteúdo editável
Tudo em `content/home.config.ts`: `CONTACT`, `COPY`, `NAV`, `HERO`, `SHOWREEL`, `FEATURED_WORKS`, `SOBRE_HEADLINE`/`SOBRE_TEXT`, `ABOUT`, `CLIENTS`, `WORKFLOW_DATA`. Textos não definidos ficam como placeholder `[EM BREVE]`-style — nunca inventar copy.

## Regra de copy
Textos aprovados: os dois textos do hero, "Começar um projeto", "Role para explorar", rótulos da navegação e "Vamos conversar?". O resto é placeholder até o autor definir.

## Páginas secundárias
`/work`, `/cases`, `/pricing`, 404 reutilizam as primitivas de `globals.css` (`.wrap`, `.section`, `.btn`, `.chip`…) já retintadas para Phthalo.
