/**
 * Gera components/site/brandmark.generated.ts com os CONTORNOS (paths SVG) de
 * "BIRO" e do descritor na fonte American Captain.
 *
 * Por que contornos e não @font-face: a licença gratuita da American Captain é de uso
 * pessoal e proíbe deixar o arquivo da fonte acessível a terceiros (um webfont fica
 * baixável). Usar os caracteres como desenho é permitido (item 5 da EULA). Por isso o
 * arquivo .ttf NUNCA entra no repositório — só os paths gerados.
 *
 * Uso (rode de novo se mudar o texto do descritor):
 *   node scripts/build-brandmark.mjs "C:/caminho/American Captain.ttf"
 *
 * Geometria (tudo nas mesmas unidades, então o alinhamento é exato em qualquer tela):
 * - viewBox do BIRO = caixa de tinta das 4 letras (borda da tinta = borda do SVG);
 * - descritor no MESMO sistema de x, em dois PARES que rimam com o nome (BI | RO se abre
 *   em volta do rosto): "DIREÇÃO · PRODUÇÃO" sob o B e "AUDIO · VISUAL" sob o O.
 *   Desktop: cada par numa linha, justificado nas bordas da letra de cima, com um ponto no meio.
 *   Celular: cada par empilhado em duas linhas (numa linha a letra ficaria ilegível).
 *   Cada palavra sai num path próprio, com o deslocamento do estado "fechado" (dx/dy):
 *   na abertura o par nasce junto e se abre quando o retrato entra (CSS em home.css).
 */
import fs from "node:fs";
import opentype from "opentype.js";

const fontPath = process.argv[2];
if (!fontPath || !fs.existsSync(fontPath)) {
  console.error("Informe o caminho do .ttf: node scripts/build-brandmark.mjs <fonte.ttf>");
  process.exit(1);
}
const font = opentype.loadSync(fontPath);
const UPM = 1000;
const WORD = "BIRO";
const PAIR_A = ["DIREÇÃO", "PRODUÇÃO"]; // sob o B
const PAIR_B = ["AUDIO", "VISUAL"]; // sob o O
const DESC_TEXT = "direção e produção audiovisual"; // como um leitor de tela lê o descritor
const TRACK = 0.06; // espacejamento do descritor, em fração do tamanho dele
const GAP = 22; // distância da base do BIRO até o topo do acento mais alto do descritor (unidades)

const r = (n) => Math.round(n * 100) / 100;

/** Glifos um a um (para aplicar tracking), com kerning. */
function layout(text, size, track) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / UPM;
  let x = 0;
  const parts = [];
  glyphs.forEach((g, i) => {
    parts.push({ g, x });
    x += g.advanceWidth * scale + (i < glyphs.length - 1 ? track * size : 0);
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  return { parts, scale };
}
function inkBox(text, size, track) {
  const { parts, scale } = layout(text, size, track);
  let x1 = Infinity, x2 = -Infinity, y1 = Infinity, y2 = -Infinity;
  for (const { g, x } of parts) {
    const b = g.getPath(x, 0, size).getBoundingBox();
    if (!isFinite(b.x1)) continue;
    x1 = Math.min(x1, b.x1); x2 = Math.max(x2, b.x2); y1 = Math.min(y1, b.y1); y2 = Math.max(y2, b.y2);
  }
  return { x1, x2, y1, y2, scale };
}
function pathData(text, size, track, dx, dy) {
  const { parts } = layout(text, size, track);
  return parts.map(({ g, x }) => g.getPath(x + dx, dy, size).toPathData(2)).join("");
}

/**
 * Uma variante = BIRO com certo espaçamento entre letras (em unidades) + descritor.
 * descSize null  -> AUDIOVISUAL ocupa exatamente a tinta do O (tamanho resolvido)
 * descSize número -> tamanho fixo; DIREÇÃO na tinta do B, AUDIOVISUAL terminando na tinta do O
 */
/** Aplica esticamento horizontal (sx) nos comandos de um path, a partir de x0. */
function stretch(path, sx, x0) {
  for (const c of path.commands) {
    for (const k of ["x", "x1", "x2"]) if (k in c) c[k] = x0 + (c[k] - x0) * sx;
  }
  return path;
}

/**
 * Uma variante do BIRO. Modificar os caracteres como desenho é permitido pela EULA (item 5):
 * - track: espaço entre letras (unidades);
 * - sx: esticamento horizontal (letra mais larga, "estendida");
 * - stroke: contorno da mesma cor em volta da letra (engrossa = mais bold).
 * O viewBox já inclui o contorno: borda da tinta visível = borda do SVG.
 * descSize null -> a palavra mais larga do descritor ocupa a tinta da letra de cima;
 * número -> tamanho fixo. stacked -> cada par em duas linhas (celular).
 */
function variant({ track, sx, stroke, descSize, stacked = false }) {
  const word = font.stringToGlyphs(WORD);
  const box0 = inkBox(WORD, UPM, 0);
  const pad = stroke / 2;
  const letters = [];
  let x = 0;
  word.forEach((g, i) => {
    const raw = g.getPath(0, 0, UPM).getBoundingBox();
    const ox = x * sx - box0.x1 * sx + pad; // origem da letra já esticada e deslocada
    const p = stretch(g.getPath(0, -box0.y1 + pad, UPM), sx, 0);
    for (const c of p.commands) for (const k of ["x", "x1", "x2"]) if (k in c) c[k] += ox;
    letters.push({ d: p.toPathData(2), x1: ox + raw.x1 * sx - pad, x2: ox + raw.x2 * sx + pad });
    x += g.advanceWidth + track / sx;
    if (i < word.length - 1) x += font.getKerningValue(g, word[i + 1]);
  });
  const W = letters[letters.length - 1].x2;
  const H = box0.y2 - box0.y1 + stroke;
  const B = letters[0];
  const O = letters[letters.length - 1];

  const all = [...PAIR_A, ...PAIR_B];
  const widthAt = (w, sz) => { const k = inkBox(w, sz, TRACK); return k.x2 - k.x1; };
  // celular: o tamanho é resolvido para a palavra mais larga ocupar a tinta da letra de cima
  const widest = all.reduce((m, w) => (widthAt(w, 100) > widthAt(m, 100) ? w : m));
  // (0,8: um pouco menor que a letra, para a 2ª linha não entrar atrás do cabelo do retrato)
  const size = descSize ?? 0.8 * 100 * ((B.x2 - B.x1) / widthAt(widest, 100));
  const boxes = Object.fromEntries(all.map((w) => [w, inkBox(w, size, TRACK)]));
  const top = Math.min(...all.map((w) => boxes[w].y1));
  const bottom = Math.max(...all.map((w) => boxes[w].y2));
  const baseY = GAP - top;
  const descWord = (w, x, y, dx, dy) => ({ d: pathData(w, size, TRACK, x - boxes[w].x1, y), dx: r(dx), dy: r(dy) });

  const desc = [];
  const dots = [];
  let descH;
  if (stacked) {
    // duas linhas por par: a 2ª nasce escondida sob a 1ª e desce
    const lineH = bottom - top + 0.3 * size;
    for (const [pair, L, alignRight] of [[PAIR_A, B, false], [PAIR_B, O, true]]) {
      pair.forEach((w, i) => {
        const bw = boxes[w].x2 - boxes[w].x1;
        desc.push(descWord(w, alignRight ? L.x2 - bw : L.x1, baseY + i * lineH, 0, -i * lineH));
      });
    }
    descH = baseY + lineH + bottom;
  } else {
    // uma linha por par, justificada na letra; fechado = as duas palavras juntas no centro da letra
    const cap = inkBox("I", size, 0);
    const dot = 0.17 * size;
    const closedGap = 0.34 * size;
    // vão de referência = o do par do B; o par do O abre o espacejamento das letras até o vão
    // dele ficar igual (é o "AUDIO · VISUAL" espaçado de propósito, justificado no O)
    const gapOf = (pair, L, tr) => L.x2 - L.x1 - pair.reduce((n, w) => { const k = inkBox(w, size, tr); return n + k.x2 - k.x1; }, 0);
    const gapA = gapOf(PAIR_A, B, TRACK);
    const steps = PAIR_B.reduce((n, w) => n + w.length - 1, 0);
    const trackB = TRACK + Math.max(0, gapOf(PAIR_B, O, TRACK) - gapA) / (steps * size);
    for (const [pair, L, tr] of [[PAIR_A, B, TRACK], [PAIR_B, O, trackB]]) {
      for (const w of pair) boxes[w] = inkBox(w, size, tr);
      const descWord = (w, x, y, dx, dy) => ({ d: pathData(w, size, tr, x - boxes[w].x1, y), dx: r(dx), dy: r(dy) });
      const [wa, wb] = pair.map((w) => boxes[w].x2 - boxes[w].x1);
      const c = (L.x1 + L.x2) / 2;
      const xa = L.x1;
      const xb = L.x2 - wb;
      const xaClosed = c - (wa + closedGap + wb) / 2;
      desc.push(descWord(pair[0], xa, baseY, xaClosed - xa, 0), descWord(pair[1], xb, baseY, xaClosed + wa + closedGap - xb, 0));
      // ponto quadrado (a fonte é de blocos) no meio do vão, na meia altura da maiúscula
      const gapC = (xa + wa + xb) / 2;
      const cy = baseY + (cap.y1 + cap.y2) / 2;
      dots.push(`M${r(gapC - dot / 2)} ${r(cy - dot / 2)}h${r(dot)}v${r(dot)}h${r(-dot)}Z`);
    }
    descH = baseY + bottom;
  }
  return {
    W: r(W), H: r(H), stroke, descSize: r(size), descH: r(descH),
    letters: letters.map((l) => l.d),
    desc, dots,
  };
}

// celular: BIRO junto e um pouco mais largo/grosso (o rosto fica abaixo do nome)
const tight = variant({ track: 20, sx: 1.12, stroke: 16, descSize: null, stacked: true });
// desktop: largo e bold, com espaço moderado entre as letras; o descritor mantém o
// tamanho visual que tinha (79,26u com o BIRO a 42svh -> BIRO agora a DESK_H svh)
const DESK_H = 50;
const wide = variant({ track: 110, sx: 1.4, stroke: 26, descSize: 79.26 * (42 / DESK_H) });

const out = `// GERADO por scripts/build-brandmark.mjs — não edite à mão.
// Contornos da American Captain (fonte NÃO incluída no repositório; ver o script).

/** Uma palavra do descritor: contorno + deslocamento do estado "fechado" (antes de o par se abrir). */
export type DescWord = { d: string; dx: number; dy: number };
export type BrandVariant = {
  W: number; H: number; stroke: number; descSize: number; descH: number;
  letters: readonly string[]; desc: readonly DescWord[]; dots: readonly string[];
};
/** texto do descritor para leitores de tela (os contornos são só desenho) */
export const DESC_TEXT = ${JSON.stringify(DESC_TEXT)};
/** desktop: altura do BIRO pensada para ${DESK_H}svh */
export const BRAND_DESK_H_SVH = ${DESK_H};
export const BRAND_WIDE: BrandVariant = ${JSON.stringify(wide, null, 2)};
export const BRAND_TIGHT: BrandVariant = ${JSON.stringify(tight, null, 2)};
`;
fs.writeFileSync(new URL("../components/site/brandmark.generated.ts", import.meta.url), out);
console.log(`ok · wide ${wide.W}x${wide.H} (desc ${wide.descSize}u) · tight ${tight.W}x${tight.H} (desc ${tight.descSize}u)`);
