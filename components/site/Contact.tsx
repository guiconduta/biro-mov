import { site } from "@/lib/catalog";

export function Contact() {
  const { whatsapp, instagram, email } = site.contact;

  const waDigits = whatsapp.replace(/\D/g, "");
  const waE164 =
    waDigits && !waDigits.startsWith("55") && waDigits.length <= 11 ? `55${waDigits}` : waDigits;
  const wa = waE164 ? `https://wa.me/${waE164}` : undefined;
  const ig = instagram ? `https://instagram.com/${instagram.replace(/^@/, "")}` : undefined;
  const mail = email ? `mailto:${email}` : undefined;

  return (
    <section className="section contact" id="contact">
      <div className="waves" aria-hidden />
      <div className="glow" aria-hidden />
      <div className="contact__inner">
        <span className="eyebrow eyebrow--center">Vamos conversar</span>
        <h2>
          Sua próxima ideia<br />já pode entrar em <b>cena</b>.
        </h2>
        <p className="lead">
          Me conta o que sua marca precisa comunicar. A gente define o objetivo, encontra o
          formato e coloca a produção em movimento.
        </p>
        <div className="contact__links">
          <a className="btn btn--solid" href={wa ?? "#"}>
            {whatsapp ? `WhatsApp · ${whatsapp}` : "[WhatsApp]"}
          </a>
          <a className="btn btn--ghost" href={ig ?? "#"} translate="no">
            {instagram || "@biro.mov"}
          </a>
          <a className="btn btn--ghost" href={mail ?? "#"}>
            {email || "[e-mail]"}
          </a>
        </div>
        <p className="contact__credit" translate="no">
          Guilherme Conduta Araujo · Joinville/SC · 2026.2
        </p>
      </div>
    </section>
  );
}
