import { COPY, CONTACT, mailUrl, whatsappUrl } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { IconArrow } from "@/components/icons";

export function Contact() {
  return (
    <section id="contato" className="contact" aria-labelledby="contato-label">
      <div className="contact__glow" aria-hidden />
      <Reveal>
        <h2 id="contato-label" className="label">CONTATO</h2>
      </Reveal>

      <Reveal delay={100}>
        <p className="contact__headline">{COPY.contactHeadline}</p>
      </Reveal>

      <Reveal delay={200} className="contact__actions">
        <Magnetic>
          <a href={whatsappUrl} className="btn btn--solid btn--lg" target="_blank" rel="noopener noreferrer">
            {COPY.cta}
            <IconArrow size={20} />
          </a>
        </Magnetic>
        <ul className="contact__links">
          <li>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__k">WhatsApp</span>
              <span>{CONTACT.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__k">Instagram</span>
              <span>{CONTACT.instagramHandle}</span>
            </a>
          </li>
          <li>
            <a href={mailUrl} className="contact__link">
              <span className="contact__k">E-mail</span>
              <span>{CONTACT.email}</span>
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
