import Link from "next/link";
import { COPY, FEATURED_WORKS } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/icons";
import { ProjectFeature } from "./ProjectFeature";

// ritmo de montagem: o 1º abre em tela cheia, os seguintes entram assimétricos, alternando o lado
const variantFor = (i: number) => (i === 0 ? "full" : "asym");

export function SelectedWorks() {
  return (
    <section id="trabalhos" className="works" aria-labelledby="trabalhos-label">
      <Reveal className="works__head">
        <h2 id="trabalhos-label" className="label">TRABALHOS</h2>
      </Reveal>

      {FEATURED_WORKS.map((work, i) => (
        <Reveal key={i} className={`works__item works__item--${variantFor(i)}`}>
          <ProjectFeature work={work} index={i} variant={variantFor(i)} flip={i % 2 === 0} />
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
