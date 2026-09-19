import Image from "next/image";
import { COPY, HERO } from "@/content/home.config";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { Magnetic } from "@/components/ui/Magnetic";
import { IconArrow, IconMouse } from "@/components/icons";

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
          <h1 className="hero__brand" aria-label="BIRO.mov">
            <span className="hero__biro" aria-hidden>
              <span className="ltr">B</span><span className="ltr ltr--i">I</span><span className="ltr">R</span><span className="ltr">O</span>
            </span>
            <span className="hero__mov" aria-hidden>.mov</span>
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

      {/* texto à esquerda + CTA */}
      <div className="hero__left">
        <p className="hero__tagline">
          <Lines lines={COPY.heroTagline} />
        </p>
        <div className="hero__cta">
          <Magnetic>
            <a href="#contato" className="btn btn--solid">
              {COPY.cta}
              <IconArrow size={18} />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* texto principal à direita */}
      <p className="hero__statement">
        <Lines lines={COPY.heroStatement} />
      </p>

      <a href="#showreel" className="hero__scroll">
        <IconMouse size={22} />
        <span>{COPY.scroll}</span>
      </a>
    </HeroParallax>
  );
}
