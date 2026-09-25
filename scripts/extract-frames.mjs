// Extrai quadros de um vídeo para o "scrub" dos cards de Trabalhos.
//   node scripts/extract-frames.mjs <video.mp4> <nome-curto> [quantidade=12]
// Gera public/works/<nome-curto>/01.webp … e imprime a linha `frames: [...]` para colar
// no trabalho correspondente em content/home.config.ts. Precisa do ffmpeg instalado.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [video, slug, countArg] = process.argv.slice(2);
if (!video || !slug) {
  console.error("uso: node scripts/extract-frames.mjs <video.mp4> <nome-curto> [quantidade=12]");
  process.exit(1);
}
const count = Number(countArg ?? 12);
const duration = Number(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video]).toString().trim(),
);
if (!duration) throw new Error("não consegui ler a duração do vídeo");

const outDir = join("public", "works", slug);
mkdirSync(outDir, { recursive: true });
const paths = [];
for (let i = 0; i < count; i++) {
  // o meio de cada fatia: evita o preto do começo e o fade do fim
  const t = (duration * (i + 0.5)) / count;
  const name = `${String(i + 1).padStart(2, "0")}.webp`;
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-ss", t.toFixed(2), "-i", video,
    "-frames:v", "1", "-vf", "scale=1280:-2", "-c:v", "libwebp", "-quality", "72",
    join(outDir, name),
  ]);
  paths.push(`/works/${slug}/${name}`);
  process.stdout.write(`\r${i + 1}/${count}`);
}
console.log(`\n\nframes: ${JSON.stringify(paths)},`);
