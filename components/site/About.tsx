import { Fragment } from "react";
import Image from "next/image";
import { ABOUT, SOBRE_HEADLINE, SOBRE_TEXT } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";

/** Cada palavra vira um <span class="w"> com a sua posição (--wi), para o texto entrar palavra por palavra. */
function words(text: string, start: number) {
  return text.split(/\s+/).map((w, i) => (
    <Fragment key={i}>
      <span className="w" style={{ ["--wi" as string]: start + i }}>{w}</span>{" "}
    </Fragment>
  ));
}

export function About() {
  const paragraphs = SOBRE_TEXT.trim() ? SOBRE_TEXT.trim().split(/\n\s*\n/) : [];
  // a contagem das palavras continua de um parágrafo para o outro
  const offsets = paragraphs.map((_, i) => paragraphs.slice(0, i).reduce((n, p) => n + p.split(/\s+/).length, 0));

  return (
    <section id="sobre" className="about" aria-labelledby="sobre-label">
      <div className="about__grid">
        <div className="about__copy">
          <Reveal mode="mask">
            <h2 id="sobre-label" className="about__headline">{SOBRE_HEADLINE || <span className="todo">[SOBRE_HEADLINE]</span>}</h2>
          </Reveal>
          <Reveal delay={200} mode="words">
            <div className="about__text">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{words(p, offsets[i])}</p>)
              ) : (
                <p className="todo">[SOBRE_TEXT]</p>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="about__photo-wrap" delay={150} mode="wipe">
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
    </section>
  );
}
