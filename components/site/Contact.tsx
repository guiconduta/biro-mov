import { site } from "@/lib/catalog";

export function Contact() {
  const { whatsapp, instagram, email, availabilityNote } = site.contact;

  const waDigits = whatsapp.replace(/\D/g, "");
  const waE164 = waDigits && !waDigits.startsWith("55") && waDigits.length <= 11
    ? `55${waDigits}`
    : waDigits;
  const wa = waE164 ? `https://wa.me/${waE164}` : undefined;
  const ig = instagram
    ? `https://instagram.com/${instagram.replace(/^@/, "")}`
    : undefined;
  const mail = email ? `mailto:${email}` : undefined;

  return (
    <section className="section contact" id="contact">
      <div className="orb contact__orb" aria-hidden />
      <div className="wrap contact__inner">
        <span className="hud" style={{ justifyContent: "center" }}>
          <span className="hud__dot" />
          {availabilityNote || "[AGENDA ABERTA — X PROJETOS ESTE MÊS]"}
        </span>
        <h2>Vamos tirar da ideia?</h2>
        <div className="contact__links">
          <a className="btn-ghost" href={wa ?? "#"}>
            {whatsapp || "[WhatsApp]"}
          </a>
          <a className="btn-ghost" href={ig ?? "#"}>
            {instagram || "@biro.mov"}
          </a>
          <a className="btn-ghost" href={mail ?? "#"}>
            {email || "[e-mail]"}
          </a>
        </div>
      </div>
    </section>
  );
}
