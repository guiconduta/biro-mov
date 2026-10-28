// EXPERIMENTO (branch experimento/skills): Home refeita com a direção "contact sheet" da skill
// design-taste-frontend. O original está em redesign/v4 / produção — nada daqui vai pro ar sem pedido.
import "./home.css";
import "./exp.css";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import {
  ABOUT,
  CONTACT,
  COPY,
  SOBRE_HEADLINE,
  SOBRE_TEXT,
  WHY_ME,
  WORKFLOW_DATA,
  whatsappUrl,
  mailUrl,
} from "@/content/home.config";
import { getClients } from "@/lib/catalog";
import { featuredRuns, libraryRuns, stripFrames } from "@/components/exp/data";
import { Strip } from "@/components/exp/Strip";
import { Sheet } from "@/components/exp/Sheet";
import { Process } from "@/components/exp/Process";
import { Entrances } from "@/components/exp/Entrances";
import { ContactForm } from "@/components/site/ContactForm";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-x", display: "swap" });

export default async function HomePage() {
  const featured = featuredRuns();
  const library = await libraryRuns();
  const strip = stripFrames(library);
  const clients = getClients().map((c) => c.name);
  const half = Math.ceil(clients.length / 2);
  // um quadro vertical de projetos diferentes para cada etapa
  const stepFrames = library.flatMap((r) => r.frames.filter((f) => f.h > f.w).slice(0, 1)).map((f) => f.src);
  const steps = WORKFLOW_DATA.map((s, i) => ({ ...s, src: stepFrames[i % stepFrames.length] }));

  return (
    <div className={`x ${bricolage.variable}`}>
      <Entrances />
      <header className="x-nav x-wrap">
        <a href="#inicio" className="x-nav__mark">
          BIRO.mov
        </a>
        <nav aria-label="Principal" className="x-nav__links">
          <a href="#trabalhos">Trabalhos</a>
          <a href="#sobre">Sobre</a>
          <a href="#como-trabalho">Como trabalho</a>
          <a href="/work">Ver todos os trabalhos</a>
        </nav>
        <a href="#contato" className="x-btn x-btn--sm">
          {COPY.cta}
        </a>
      </header>

      <main id="main">
        {/* 1 — o nome, uma frase e a faixa de quadros reais */}
        <section id="inicio" className="x-hero" aria-labelledby="x-title">
          <div className="x-wrap x-hero__top">
            <h1 id="x-title" className="x-display">
              BIRO — direção audiovisual
            </h1>
            <div className="x-hero__sub">
              <p className="x-lead">{COPY.heroStatement.join(" ")}</p>
              <a href="#contato" className="x-btn">
                {COPY.cta}
              </a>
            </div>
          </div>
          <Strip frames={strip} />
        </section>

        {/* 2 — a folha de contato: cada projeto, em sequência */}
        <section id="trabalhos" className="x-work" aria-labelledby="x-work-h">
          <div className="x-wrap">
            <div className="x-work__head">
              <h2 id="x-work-h" className="x-h2" data-in>
                Trabalhos
              </h2>
              <a href="/work" className="x-link" data-in>
                {COPY.seeAllWorks}
              </a>
            </div>
            <div data-in>
              <Sheet runs={featured} size="lg" />
            </div>
            <div data-in>
              <Sheet runs={library} size="sm" />
            </div>
          </div>
        </section>

        {/* 3 — sobre: fatos ao lado, parágrafo largo, clientes */}
        <section id="sobre" className="x-about" aria-labelledby="x-about-h">
          <div className="x-wrap x-about__grid">
            <h2 id="x-about-h" className="x-h2 x-about__h" data-in>
              {SOBRE_HEADLINE}
            </h2>
            <dl className="x-facts" data-in>
              <div>
                <dt>Cidade</dt>
                <dd>Joinville</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={CONTACT.instagramUrl}>{CONTACT.instagramHandle}</a>
                </dd>
              </div>
              <div>
                <dt>YouTube</dt>
                <dd>
                  <a href={CONTACT.youtubeUrl}>@otiobiro</a>
                </dd>
              </div>
            </dl>
            <div className="x-about__text" data-in>
              {SOBRE_TEXT.trim()
                .split(/\n\s*\n/)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
            <figure className="x-about__photo" data-in>
              <Image src={ABOUT.photo} alt={ABOUT.photoAlt} width={ABOUT.photoWidth} height={ABOUT.photoHeight} sizes="(min-width: 900px) 56vw, 100vw" />
            </figure>
            <p className="x-about__label" data-in>
              Clientes e experiências
            </p>
            <ul className="x-about__list" data-in>
              {clients.slice(0, half).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <ul className="x-about__list" data-in>
              {clients.slice(half).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — por que me escolher: lista estreita de duas pontas */}
        <section className="x-why" aria-labelledby="x-why-h">
          <div className="x-wrap x-why__grid">
            <h2 id="x-why-h" className="x-h2" data-in>
              {WHY_ME.title}
            </h2>
            <ul className="x-why__list">
              {WHY_ME.items.map((it) => (
                <li key={it.title} data-in>
                  <span className="x-why__dot" aria-hidden />
                  <span className="x-why__t">{it.title}</span>
                  <span className="x-why__d">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — como trabalho: fila que se puxa de lado */}
        <Process steps={steps} />

        {/* 6 — contato */}
        <section id="contato" className="x-contact" aria-labelledby="x-contact-h">
          <div className="x-wrap x-contact__band">
            <p className="x-statement" data-in>
              {COPY.contactSub}
            </p>
            <figure className="x-contact__photo" data-in>
              <Image src={ABOUT.photo} alt={ABOUT.photoAlt} width={480} height={480} sizes="170px" />
            </figure>
            <div className="x-contact__ask" data-in>
              <h2 id="x-contact-h" className="x-contact__h">
                {COPY.contactHeadline}
              </h2>
              <a href={mailUrl} className="x-link">
                {CONTACT.email}
              </a>
              <a href={whatsappUrl} className="x-link">
                WhatsApp {CONTACT.phoneDisplay}
              </a>
              <span className="x-muted">Joinville</span>
            </div>
          </div>
          <div className="x-wrap x-contact__form" data-in>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="x-foot x-wrap">
        <span className="x-muted">BIRO.mov — direção audiovisual</span>
        <nav aria-label="Redes" className="x-foot__links">
          <a href={CONTACT.instagramUrl}>Instagram</a>
          <a href={CONTACT.youtubeUrl}>YouTube</a>
          <a href={mailUrl}>E-mail</a>
          <a href={whatsappUrl}>WhatsApp</a>
        </nav>
        <span className="x-muted x-foot__y">© 2026</span>
      </footer>
    </div>
  );
}
