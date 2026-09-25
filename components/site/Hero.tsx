import Image from "next/image";
import { COPY, HERO } from "@/content/home.config";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { Magnetic } from "@/components/ui/Magnetic";
import { IconArrow, IconMouse } from "@/components/icons";
import { BRAND_H, BRAND_LETTERS, BRAND_W, DESC_H, DESC_PATHS, DESC_WORDS } from "@/components/site/brandmark.generated";

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
          <h1 className="hero__brand" style={{ ["--ar" as string]: BRAND_W / BRAND_H }}>
            <span className="sr-only">BIRO — {DESC_WORDS.join(" ").toLowerCase()}</span>
            <svg className="hero__biro" viewBox={`0 0 ${BRAND_W} ${BRAND_H}`} aria-hidden focusable="false">
              {BRAND_LETTERS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
            <svg className="hero__desc" viewBox={`0 0 ${BRAND_W} ${DESC_H}`} aria-hidden focusable="false">
              {DESC_PATHS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
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
