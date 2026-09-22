/**
 * Embeds do YouTube usados em três lugares (Showreel, ficha do projeto, /work) —
 * regras comuns ficam aqui pra não repetir três vezes.
 */

/** Sem legenda forçada, sem anotações, sem sugestões de fora do canal, sem marca extra. */
export function ytEmbedSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    cc_load_policy: "0", // legenda começa desligada
    iv_load_policy: "3", // sem anotações
    enablejsapi: "1", // necessário pra nudgeYouTubeQuality funcionar
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Pede pro player usar a maior qualidade disponível assim que o player estiver pronto.
 * Best-effort: o YouTube considera esse comando "sem garantia" desde 2018 — ele pode
 * ignorar e adaptar sozinho pela banda do visitante. Ainda assim ajuda na prática.
 * O player real (iframe do YouTube) só existe no browser, então isso só roda em useEffect.
 */
export function nudgeYouTubeQuality(iframe: HTMLIFrameElement | null): () => void {
  if (!iframe) return () => {};
  const send = () => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "setPlaybackQuality", args: ["hd1080"] }),
      "*",
    );
  };
  const t1 = window.setTimeout(send, 800);
  const t2 = window.setTimeout(send, 2200);
  return () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
  };
}
