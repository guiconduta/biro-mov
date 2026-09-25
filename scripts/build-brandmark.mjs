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
 * - descritor no MESMO sistema de x: 1ª palavra começa na tinta do B; a 2ª ocupa
 *   exatamente a tinta do O (tamanho resolvido para caber); a 1ª usa o mesmo tamanho.
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
const [DESC_A, DESC_B] = ["DIREÇÃO", "AUDIOVISUAL"];
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

// ---- BIRO: uma path por letra (dá para animar letra a letra depois)
const word = font.stringToGlyphs(WORD);
const wordBox = inkBox(WORD, UPM, 0);
const letters = [];
{
  let x = 0;
  word.forEach((g, i) => {
    const p = g.getPath(x - wordBox.x1, 0 - wordBox.y1, UPM);
    const b = g.getPath(x, 0, UPM).getBoundingBox();
    letters.push({ d: p.toPathData(2), x1: b.x1 - wordBox.x1, x2: b.x2 - wordBox.x1 });
    x += g.advanceWidth;
    if (i < word.length - 1) x += font.getKerningValue(g, word[i + 1]);
  });
}
const W = wordBox.x2 - wordBox.x1;
const H = wordBox.y2 - wordBox.y1; // base do BIRO = y H
const B = letters[0];
const O = letters[letters.length - 1];

// ---- descritor: AUDIOVISUAL ocupa a tinta do O; o tamanho vale para as duas palavras
const probe = inkBox(DESC_B, 100, TRACK);
const size = 100 * ((O.x2 - O.x1) / (probe.x2 - probe.x1));
const a = inkBox(DESC_A, size, TRACK);
const b = inkBox(DESC_B, size, TRACK);
const top = Math.min(a.y1, b.y1); // tilde do Ã fica acima da linha de capitular
const bottom = Math.max(a.y2, b.y2); // cedilha fica abaixo da base
const baseY = GAP - top; // base do descritor dentro do viewBox dele
const descH = baseY + bottom;
const dA = pathData(DESC_A, size, TRACK, B.x1 - a.x1, baseY);
const dB = pathData(DESC_B, size, TRACK, O.x2 - b.x2, baseY);

const out = `// GERADO por scripts/build-brandmark.mjs — não edite à mão.
// Contornos da American Captain (fonte NÃO incluída no repositório; ver o script).

export const BRAND_W = ${r(W)};
export const BRAND_H = ${r(H)};
export const BRAND_LETTERS = ${JSON.stringify(letters.map((l) => l.d), null, 2)} as const;

export const DESC_H = ${r(descH)};
export const DESC_WORDS = ${JSON.stringify([DESC_A, DESC_B])} as const;
export const DESC_PATHS = ${JSON.stringify([dA, dB], null, 2)} as const;
`;
fs.writeFileSync(new URL("../components/site/brandmark.generated.ts", import.meta.url), out);
console.log(`ok · BIRO ${r(W)}x${r(H)} · descritor ${r(size)}u (${((size / H) * 100).toFixed(1)}% da altura) · altura ${r(descH)}`);
console.log(`B tinta ${r(B.x1)}–${r(B.x2)} | O tinta ${r(O.x1)}–${r(O.x2)}`);
