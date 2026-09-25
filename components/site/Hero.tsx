import Image from "next/image";
import { COPY, HERO } from "@/content/home.config";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { Magnetic } from "@/components/ui/Magnetic";
import { IconArrow, IconMouse } from "@/components/icons";
import { BRAND_TIGHT, BRAND_WIDE, DESC_WORDS, type BrandVariant } from "@/components/site/brandmark.generated";

/** BIRO + descritor de uma variante; os dois SVGs têm a mesma largura de viewBox = alinhamento exato. */
function Mark({ v, className }: { v: BrandVariant; className: string }) {
  return (
    <span className={`hero__mark ${className}`}>
      <svg className="hero__biro" viewBox={`0 0 ${v.W} ${v.H}`} aria-hidden focusable="false">
        {v.letters.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
      <svg className="hero__desc" viewBox={`0 0 ${v.W} ${v.descH}`} aria-hidden focusable="false">
        {v.desc.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </span>
  );
}

/** Linha com máscara: o texto sobe de dentro dela (reveal). */
function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span className="line" key={line}>
          <span style={{ ["--i" as string]: i }}>{line}</span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <HeroParallax className="hero">
      {/* palco: fundo + BIRO + retrato (camadas separadas, todas reais) */}
      <div className="hero__stage">
        <div className="hero__bg" aria-hidden />
        <div className="hero__grain" aria-hidden />

        <div className="hero__brand-wrap">
          {/* contornos (não texto): mesmo viewBox de largura nos dois SVGs = alinhamento exato */}
          <h1
            className="hero__brand"
            style={{
              ["--ar-wide" as string]: BRAND_WIDE.W / BRAND_WIDE.H,
              ["--ar-tight" as string]: BRAND_TIGHT.W / BRAND_TIGHT.H,
            }}
          >
            <span className="sr-only">BIRO — {DESC_WORDS.join(" ").toLowerCase()}</span>
            {/* desktop: letras espaçadas em volta do rosto · celular: BIRO junto */}
            <Mark v={BRAND_WIDE} className="hero__mark--wide" />
            <Mark v={BRAND_TIGHT} className="hero__mark--tight" />
          </h1>
        </div>

        <div className="hero__figure-wrap">
          <div className="hero__figure">
            <Image
              src={HERO.figure}
              alt={HERO.figureAlt}
              width={HERO.figureWidth}
              height={HERO.figureHeight}
              priority
              sizes="(min-width: 820px) 113vh, 66vh"
              quality={90}
              style={{ height: "100%", width: "auto" }}
            />
          </div>
        </div>
        <div className="hero__fade" aria-hidden />
      </div>

      {/* texto à esquerda */}
      <p className="hero__left hero__tagline">
        <Lines lines={COPY.heroTagline} />
      </p>

      {/* texto principal à direita */}
      <p className="hero__statement">
        <Lines lines={COPY.heroStatement} />
      </p>

      {/* CTA: centralizado horizontalmente, sob o rosto */}
      <div className="hero__cta">
        <Magnetic>
          <a href="#contato" className="btn btn--solid">
            {COPY.cta}
            <IconArrow size={18} />
          </a>
        </Magnetic>
      </div>

      <a href="#showreel" className="hero__scroll">
        <IconMouse size={22} />
        <span>{COPY.scroll}</span>
      </a>
    </HeroParallax>
  );
}
