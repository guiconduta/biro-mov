import Image from "next/image";
import { site } from "@/lib/catalog";

export function Hero() {
  const { ctaLabel, media } = site.hero;
  return (
    <section className="hero" id="top">
      <Image
        src={media}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", opacity: 0.28 }}
      />
      <div className="waves" aria-hidden />
      <div className="glow" aria-hidden />
      <div className="hero__scrim" aria-hidden />

      <div className="hero__inner">
        <span className="eyebrow">{site.descriptor} · 2026</span>
        <h1>
          Ideias em cena.<br />
          Marcas em <b>movimento</b>.
        </h1>
        <p className="lead">{site.slogan.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}.</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href="#selected">{ctaLabel}</a>
          <a className="btn btn--ghost" href="#contact">Falar no WhatsApp</a>
        </div>
        <span className="hero__scroll" aria-hidden>SCROLL</span>
      </div>
    </section>
  );
}
