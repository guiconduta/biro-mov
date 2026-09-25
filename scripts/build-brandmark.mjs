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

/**
 * Uma variante = BIRO com certo espaçamento entre letras (em unidades) + descritor.
 * descSize null  -> AUDIOVISUAL ocupa exatamente a tinta do O (tamanho resolvido)
 * descSize número -> tamanho fixo; DIREÇÃO na tinta do B, AUDIOVISUAL terminando na tinta do O
 */
function variant(track, descSize) {
  const word = font.stringToGlyphs(WORD);
  const box0 = inkBox(WORD, UPM, 0);
  const letters = [];
  let x = 0;
  word.forEach((g, i) => {
    const b = g.getPath(x, 0, UPM).getBoundingBox();
    letters.push({ d: g.getPath(x - box0.x1, -box0.y1, UPM).toPathData(2), x1: b.x1 - box0.x1, x2: b.x2 - box0.x1 });
    x += g.advanceWidth + track;
    if (i < word.length - 1) x += font.getKerningValue(g, word[i + 1]);
  });
  const W = letters[letters.length - 1].x2;
  const H = box0.y2 - box0.y1;
  const B = letters[0];
  const O = letters[letters.length - 1];

  const probe = inkBox(DESC_B, 100, TRACK);
  const size = descSize ?? 100 * ((O.x2 - O.x1) / (probe.x2 - probe.x1));
  const a = inkBox(DESC_A, size, TRACK);
  const b = inkBox(DESC_B, size, TRACK);
  const top = Math.min(a.y1, b.y1);
  const bottom = Math.max(a.y2, b.y2);
  const baseY = GAP - top;
  return {
    W: r(W), H: r(H), descSize: r(size), descH: r(baseY + bottom),
    letters: letters.map((l) => l.d),
    desc: [pathData(DESC_A, size, TRACK, B.x1 - a.x1, baseY), pathData(DESC_B, size, TRACK, O.x2 - b.x2, baseY)],
  };
}

// celular: BIRO junto (o rosto fica abaixo do nome, nada é coberto)
const tight = variant(0, null);
// desktop: letras espaçadas para o I e o R aparecerem nas bordas do rosto; o descritor
// mantém o tamanho visual que tinha (79,26u com o BIRO a 42svh -> BIRO agora a DESK_H svh)
const DESK_TRACK = 220;
const DESK_H = 50;
const wide = variant(DESK_TRACK, 79.26 * (42 / DESK_H));

const out = `// GERADO por scripts/build-brandmark.mjs — não edite à mão.
// Contornos da American Captain (fonte NÃO incluída no repositório; ver o script).

export type BrandVariant = {
  W: number; H: number; descSize: number; descH: number;
  letters: readonly string[]; desc: readonly [string, string];
};
export const DESC_WORDS = ${JSON.stringify([DESC_A, DESC_B])} as const;
/** desktop: altura do BIRO pensada para ${DESK_H}svh */
export const BRAND_DESK_H_SVH = ${DESK_H};
export const BRAND_WIDE: BrandVariant = ${JSON.stringify(wide, null, 2)};
export const BRAND_TIGHT: BrandVariant = ${JSON.stringify(tight, null, 2)};
`;
fs.writeFileSync(new URL("../components/site/brandmark.generated.ts", import.meta.url), out);
console.log(`ok · wide ${wide.W}x${wide.H} (desc ${wide.descSize}u) · tight ${tight.W}x${tight.H} (desc ${tight.descSize}u)`);
