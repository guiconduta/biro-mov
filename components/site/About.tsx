import Image from "next/image";
import { ABOUT, SOBRE_HEADLINE, SOBRE_TEXT } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { AboutRoles } from "@/components/site/AboutRoles";

export function About() {
  const paragraphs = SOBRE_TEXT.trim() ? SOBRE_TEXT.trim().split(/\n\s*\n/) : [];

  return (
    <section id="sobre" className="about" aria-labelledby="sobre-label">
      <div className="about__grid">
        <div className="about__copy">
          <Reveal>
            <h2 id="sobre-label" className="about__headline">{SOBRE_HEADLINE || <span className="todo">[SOBRE_HEADLINE]</span>}</h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="about__text">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p className="todo">[SOBRE_TEXT]</p>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="about__photo-wrap" delay={150}>
          <div className="about__photo">
            <Image
              src={ABOUT.photo}
              alt={ABOUT.photoAlt}
              width={ABOUT.photoWidth}
              height={ABOUT.photoHeight}
              sizes="(min-width: 900px) 44vw, 100vw"
            />
          </div>
        </Reveal>
      </div>

      <Reveal>
        <AboutRoles roles={ABOUT.roles} />
      </Reveal>
    </section>
  );
}
