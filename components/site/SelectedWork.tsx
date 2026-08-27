import Link from "next/link";
import { getHomeReel, getClients, getSelectedWork } from "@/lib/catalog";
import { VideoCard } from "./VideoCard";

export function SelectedWork() {
  const reel = getHomeReel(8);
  const isCurated = getSelectedWork().length > 0;
  const clientById = new Map(getClients().map((c) => [c.id, c.name]));

  return (
    <section className="section" id="selected">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__l">
            <span className="eyebrow">Selected Work — SEQ. 01</span>
            <h2 className="h-section">Trabalhos selecionados</h2>
          </div>
          <Link className="link-accent" href="/work">
            VER BIBLIOTECA →
          </Link>
        </div>

        <div className="reel-grid">
          {reel.map((v, i) => (
            <VideoCard
              key={v.id}
              video={v}
              seq={i + 1}
              clientLabel={v.clientId ? clientById.get(v.clientId) : undefined}
            />
          ))}
        </div>

        {!isCurated && (
          <p className="note">
            Prévia automática — os 6–12 vídeos de destaque entram quando você marcar o tier
            <code> selected</code> na curadoria. Posters verticais próprios idem.
          </p>
        )}
      </div>
    </section>
  );
}
