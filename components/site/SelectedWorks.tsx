import Link from "next/link";
import { COPY, FEATURED_WORKS } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/icons";
import { ProjectFeature } from "./ProjectFeature";

// os 3 cards usam o mesmo molde (mídia + ficha coladas, card centralizado) — uniforme por enquanto
const VARIANTS = ["wide", "wide", "wide"] as const;

export function SelectedWorks() {
  return (
    <section id="trabalhos" className="works" aria-labelledby="trabalhos-label">
      <Reveal className="works__head">
        <h2 id="trabalhos-label" className="label">TRABALHOS</h2>
      </Reveal>

      {FEATURED_WORKS.map((work, i) => (
        <Reveal key={i} className={`works__item works__item--${VARIANTS[i]}`}>
          <ProjectFeature work={work} index={i} variant={VARIANTS[i]} />
        </Reveal>
      ))}

      <Reveal className="works__all">
        <Link href="/work" className="link-cta">
          {COPY.seeAllWorks}
          <IconArrow size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
