import Image from "next/image";
import { site } from "@/lib/catalog";

export function Hero() {
  const { headline, sub, ctaLabel, media } = site.hero;
  return (
    <section className="hero" id="top">
      <div className="hero__bg">
        <Image src={media} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="hero__scrim" />
      <div className="orb hero__orb" aria-hidden />
      <div className="brackets" aria-hidden>
        <span /><span /><span /><span />
      </div>

      <div className="hero__inner wrap">
        <span className="eyebrow" translate="no">{site.descriptor}</span>
        <h1>{headline}</h1>
        <p className="hero__sub">
          {sub || "[linha de posicionamento / conversão — a definir]"}
        </p>
        <div className="hero__cta">
          <a className="btn-pill" href="#contact">{ctaLabel}</a>
          <a className="link-under" href="#selected">Ver trabalhos</a>
        </div>
      </div>

      <div className="hero__foot" aria-hidden translate="no">
        <span>A001_C023</span>
        <span>00:00:04:20</span>
      </div>
    </section>
  );
}
