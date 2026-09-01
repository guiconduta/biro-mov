import Image from "next/image";
import { site } from "@/lib/catalog";

export function Hero() {
  const { media } = site.hero;
  return (
    <section className="hero" id="top">
      <Image src={media} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.26 }} />
      <div className="glow" aria-hidden />
      <span className="ring hero__ring" aria-hidden />
      <div className="hero__scrim" aria-hidden />

      <div className="hero__inner">
        <span className="eyebrow">{site.descriptor} · 2026</span>
        <h1>
          Ideias em cena.<br />
          Marcas em <b>movimento</b>.
        </h1>
        <p className="lead">{site.slogan.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}.</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href="#selected">Ver trabalhos</a>
          <a className="btn btn--ghost" href="#contact">Falar no WhatsApp</a>
        </div>
        <span className="hero__scroll" aria-hidden>SCROLL</span>
      </div>
    </section>
  );
}
