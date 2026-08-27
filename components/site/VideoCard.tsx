import Image from "next/image";
import Link from "next/link";
import type { PublicVideo } from "@/lib/types";

export function VideoCard({
  video,
  clientLabel,
  seq,
}: {
  video: PublicVideo;
  clientLabel?: string;
  seq?: number;
}) {
  return (
    <Link className="vcard" href={`/work#${video.id}`} aria-label={video.title}>
      {video.poster && (
        <div className="vcard__poster">
          <Image src={video.poster} alt="" fill sizes="(max-width:720px) 50vw, 25vw" style={{ objectFit: "cover" }} />
        </div>
      )}
      {typeof seq === "number" && (
        <span className="vcard__seq">{String(seq).padStart(2, "0")} · 9:16</span>
      )}
      <span className="vcard__play" aria-hidden>
        <i />
      </span>
      <span className="vcard__meta">
        {clientLabel && <span className="vcard__client">{clientLabel}</span>}
        <span className="vcard__title">{cardTitle(video.title, clientLabel)}</span>
      </span>
    </Link>
  );
}

// "Reel Elaborado - Tábua ... v3 (Gabi Silva)" -> "Tábua ... v3"
// (o prefixo de tipo e o nome do cliente entre parênteses são ruído no card)
function cardTitle(title: string, clientLabel?: string): string {
  let t = title.replace(
    /^(Edição|Entrevista|Projeto Imobiliário|Projeto Simples|Reel Elaborado|Reel Comercial|Reel Automotivo|Reel Corporativo|Reel Simples|Reel IA|VSL|Curso|Tábua Cronológica)\s*-\s*/i,
    "",
  );
  if (clientLabel) {
    const esc = clientLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(new RegExp(`\\s*\\(${esc}\\)\\s*$`, "i"), "");
  }
  return t;
}
