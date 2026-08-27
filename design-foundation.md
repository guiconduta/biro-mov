# Design Foundation — BIRO.MOV

Fonte: pasta `Desktop/Branding/` (brand board `branding.png`, `CONCEITO BIRO.MOV.png`,
`LOGO/`, fotos) + o template de orçamento. Alimenta a Fase 4 (Design).

**Leitura em uma frase:** monitor de diretor / visor de câmera — jade-preto, um único acento
verde-menta, Poppins geométrico, HUD de filmagem (REC, timecode, SEQ, colchetes de
enquadramento) como ornamento.

---

## 0. Marca

| | |
|---|---|
| Nome | **BIRO.MOV** — `BIRO` branco + `.MOV` menta |
| Descritor | `FILMMAKER & EDIÇÃO` (caixa alta, tracking largo) |
| Monograma | **BM.** (arquivos: `LOGO/logo branca.png`, `logo preta.png`, `logo verde.png`, `BM LOGO BRANCA.png`) |
| Slogan | **CONTEÚDO VISUAL COM RITMO E DIREÇÃO** |
| Assinatura de rodapé | `AUDIOVISUAL · EDIÇÃO · DIREÇÃO · STORYTELLING` |

---

## 1. Cor (paleta oficial do brand board)

| Token | Nome na marca | Hex | Uso |
|-------|---------------|-----|-----|
| `--bg` | Preto Absoluto | `#0B0B0B` | fundo da página |
| `--surface` | Grafite / Chumbo | `#1A1E1D` | cards, painéis |
| `--surface-jade` | Verde Jade Escuro | `#0F2827` | faixas/seções profundas, gradiente do hero |
| `--accent` | Verde Menta Suave | `#A7F6C5` | **acento único** — CTA, filtro ativo, `.MOV`, play, números de case, REC dot |
| `--text-hi` | — | `#F2F5F1` | títulos |
| `--text` | — | `#E7ECE8` | corpo |
| `--text-mute` | — | `#7C8A83` | secundário, meta, HUD, eyebrows |
| `--hairline` | — | `rgba(167,246,197,0.12)` | bordas 1px, colchetes de enquadramento |
| `--fill-subtle` | — | `rgba(167,246,197,0.05)` | preenchimento fantasma em hover |

Regra do acento: `#A7F6C5` é escasso — marca "a próxima ação" e "o dado que importa".
**Tema dark único** no v1.

---

## 2. Tipografia — Poppins

- **Família:** `Poppins` (Google Fonts) — "geométrica, moderna, impactante". Pesos: 500 / 600 / 700.
- Fallback: `'Poppins', system-ui, -apple-system, sans-serif`.

| Papel | Tamanho | Peso | Tracking | Caso |
|-------|---------|------|----------|------|
| Display / Hero | 64–88px | 600–700 | −1 a −3px | normal |
| Título de seção | 34–44px | 600 | −0.5 a −1px | normal |
| Lead / subtítulo | 18–22px | 500 | −0.2px | normal |
| Corpo | 15–17px | 400–500 | 0 | normal |
| **Eyebrow / HUD** | 10–12px | 500–600 | **+2 a +4px** | CAIXA ALTA |
| Meta / legenda | 12–13px | 400 | +0.5px | normal |

Assinatura: **título enorme e apertado** vs **eyebrow minúsculo e espaçado** ("SELECTED WORK",
"CLIENTS"...). O wordmark `BIRO.MOV` sempre com `.MOV` em `--accent`.

---

## 3. Forma, HUD, movimento

- **Raio:** `--r-card: 18px` · `--r-pill: 999px` · `--r-input: 8px`.
- **HUD de filmagem** (motivo assinatura, usado como cromo, não decoração vazia):
  `● REC` (dot menta pulsando), timecode `00:00:04:20`, `SEQ. 01/02...`, **colchetes de
  enquadramento** nos cantos das seções/cards, cruz central fina, guias tracejadas.
- **Ícones:** linha, vocabulário de filme — FRAME (colchetes + cruz), SEQUÊNCIA (barras
  empilhadas), MOVIMENTO (arcos), PLAY (triângulo em círculo), STORYTELLING (S sinuoso).
  Grid 16/20/24, traço 1.5–2px. **Nunca emoji.**
- **Bordas antes de sombra:** cards dark sobre canvas dark separados por `--hairline`.
- **Movimento:** contido. Fade + subida 8–16px no scroll. Hover de card = colchetes acendem
  em `--accent` + escala 1.01. REC dot pisca devagar. Sem paralaxe pesado.

---

## 4. Fotografia

Disponível em `Branding/fotos/Novas Fotos Branding/`:
- `hero photo editada.png` — Biro com câmera Sony, luz verde, fumaça, watermark BM. → **Hero + About**.
- `filmmaker.png` — silhueta com gimbal, barras de neon verde, chão reflexivo → **fundo de seção** (Process / divisor).
- `olho verde.jpg` — olho close, íris verde → motivo pontual.
- equipamentos (drone, gimbal, mic, monitor) → thumbs de "What I Do" se preciso.

Tratamento: vinheta para `--bg` nas bordas; tudo "senta" no canvas escuro.

---

## 5. Aplicação nas 8 seções da Home

| Seção | Aplicação |
|-------|-----------|
| **Header** | Monograma BM. + wordmark. Nav (Work · Selected · Clients · About · Contact). À direita: `● REC · 00:00:04:20` (HUD). CTA pill menta. |
| **Hero** | Foto do Biro full-bleed, vinheta jade→preto. Colchetes de enquadramento nos cantos. Título Display. Slogan como tagline. 1 CTA. Rodapé HUD (`SEQ. 01`). |
| **Selected Work** | Eyebrow `SELECTED WORK · SEQ. 01`. Mosaico de cards 9:16 (todos os vídeos são verticais). Poster + glifo play; hover acende colchetes. "Ver biblioteca →". |
| **Clients** | Eyebrow `CLIENTS`. Nome grande + 1 linha `[linha de autoridade]`. Sem mural de logos. |
| **What I Do** | 3–4 blocos em `--surface`, ícone de filme. Label + 1 linha de intenção + thumb. |
| **Featured Cases** | 2–4 teasers grandes: capa, título Display, resumo, "Ver case →" menta. |
| **Process** | Timeline vertical sobre `filmmaker.png` esmaecida. Nº da etapa em menta. "O que você recebe". |
| **About** | Foto do Biro, texto 1ª pessoa curto. |
| **Contact** | Headline Display. Pills WhatsApp / Instagram (@biro.mov) / e-mail com borda menta. Eyebrow de disponibilidade opcional. |
| **Footer** | `AUDIOVISUAL · EDIÇÃO · DIREÇÃO · STORYTELLING` + BM. |

---

## 6. Tokens (rascunho CSS Fase 5)

```css
:root{
  --bg:#0B0B0B; --surface:#1A1E1D; --surface-jade:#0F2827;
  --accent:#A7F6C5;
  --text-hi:#F2F5F1; --text:#E7ECE8; --text-mute:#7C8A83;
  --hairline:rgba(167,246,197,.12); --fill-subtle:rgba(167,246,197,.05);
  --font:'Poppins',system-ui,-apple-system,sans-serif;
  --r-card:18px; --r-pill:999px; --r-input:8px;
}
```

---

## 7. Pendências para o Design fechar

- Vetor do monograma BM. (tenho só PNG) — ideal ter SVG.
- Tagline do Hero: usar o slogan oficial ou algo mais direto de conversão? (slogan é
  "conceito"; um hero costuma ser mais afiado)
- Foto do About: a mesma do hero ou outra.
- Still/loop de vídeo real para o Hero (hoje uso a foto).
- Contatos reais (WhatsApp, e-mail) — o brand board usa números fictícios.
