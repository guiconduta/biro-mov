/**
 * Som do site (teste). Tudo sintetizado na hora com Web Audio — nenhum arquivo de áudio.
 * Desligado por padrão; só liga com clique do visitante (os navegadores exigem esse gesto).
 * A escolha fica lembrada neste navegador.
 *
 * Quando os sons próprios existirem, basta trocar o corpo de cada função em SOUNDS por um
 * AudioBuffer carregado de /public/sound/ — quem chama play("tick") não muda.
 */

export type SoundName = "tick" | "click" | "whoosh" | "frame" | "clip";

const KEY = "biro:sound";
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let room: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
let enabled = false;
const listeners = new Set<(on: boolean) => void>();

function noiseBuffer(ac: AudioContext, seconds: number, brown = false) {
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else d[i] = w;
  }
  return buf;
}

let whiteCache: AudioBuffer | null = null;
const white = (ac: AudioContext) => (whiteCache ??= noiseBuffer(ac, 1));

/** Rajada de ruído filtrado — base de quase todos os sons (clique de botão, grão de película). */
function burst(ac: AudioContext, out: AudioNode, o: { freq: number; q: number; dur: number; gain: number; type?: BiquadFilterType; sweepTo?: number }) {
  const t = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = white(ac);
  const f = ac.createBiquadFilter();
  f.type = o.type ?? "bandpass";
  f.frequency.setValueAtTime(o.freq, t);
  if (o.sweepTo) f.frequency.exponentialRampToValueAtTime(o.sweepTo, t + o.dur);
  f.Q.value = o.q;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(o.gain, t + Math.min(0.004, o.dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  src.connect(f).connect(g).connect(out);
  src.start(t, Math.random() * 0.5);
  src.stop(t + o.dur + 0.02);
}

function tone(ac: AudioContext, out: AudioNode, freq: number, dur: number, gain: number) {
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

const SOUNDS: Record<SoundName, (ac: AudioContext, out: AudioNode) => void> = {
  // passar o mouse num botão: tique seco e agudo
  tick: (ac, out) => burst(ac, out, { freq: 4200, q: 6, dur: 0.035, gain: 0.18 }),
  // clicar: tique + corpo grave curto (como um botão de câmera)
  click: (ac, out) => {
    burst(ac, out, { freq: 2600, q: 4, dur: 0.05, gain: 0.3 });
    tone(ac, out, 180, 0.09, 0.22);
  },
  // troca de seção: sopro de ar que sobe e desce
  whoosh: (ac, out) => burst(ac, out, { freq: 380, q: 0.9, dur: 0.75, gain: 0.16, sweepTo: 2400 }),
  // cada quadro no scrub dos trabalhos: grão de película passando no projetor
  frame: (ac, out) => burst(ac, out, { freq: 1500, q: 2.5, dur: 0.022, gain: 0.2 }),
  // playhead entrando num clipe do "Como trabalho": marcador de timeline
  clip: (ac, out) => {
    burst(ac, out, { freq: 3200, q: 8, dur: 0.04, gain: 0.16 });
    tone(ac, out, 660, 0.16, 0.08);
  },
};

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);
  return ctx;
}

/** Ambiente de sala bem baixinho (ruído marrom filtrado), para o silêncio não ficar "morto". */
function startRoom(ac: AudioContext) {
  if (room || !master) return;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, 4, true);
  src.loop = true;
  const f = ac.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 420;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, ac.currentTime + 1.6);
  src.connect(f).connect(gain).connect(master);
  src.start();
  room = { src, gain };
}

function stopRoom(ac: AudioContext) {
  if (!room) return;
  const r = room;
  room = null;
  r.gain.gain.cancelScheduledValues(ac.currentTime);
  r.gain.gain.setValueAtTime(r.gain.gain.value, ac.currentTime);
  r.gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.5);
  r.src.stop(ac.currentTime + 0.55);
}

export const sound = {
  get enabled() {
    return enabled;
  },
  /** Precisa ser chamado dentro de um clique (gesto do visitante). */
  setEnabled(on: boolean, quiet = false) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch {}
    const ac = ensure();
    if (on) {
      void ac.resume();
      startRoom(ac);
      if (!quiet) SOUNDS.click(ac, master!);
    } else stopRoom(ac);
    listeners.forEach((l) => l(on));
  },
  /** O visitante tinha deixado ligado da última vez? (só lembra — quem liga é o clique) */
  remembered() {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  },
  play(name: SoundName) {
    if (!enabled || !ctx || !master || ctx.state !== "running") return;
    SOUNDS[name](ctx, master);
  },
  subscribe(fn: (on: boolean) => void) {
    listeners.add(fn);
    return () => void listeners.delete(fn);
  },
};
