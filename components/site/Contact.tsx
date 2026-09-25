import { COPY, CONTACT, mailUrl, whatsappUrl } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { MeshBackdrop } from "@/components/ui/MeshBackdrop";

export function Contact() {
  return (
    <section id="contato" className="contact" aria-labelledby="contato-label">
      <div className="contact__glow" aria-hidden />
      <Reveal>
        <h2 id="contato-label" className="label">CONTATO</h2>
      </Reveal>

      <Reveal delay={100}>
        <p className="contact__headline">{COPY.contactHeadline}</p>
        <p className="contact__sub">{COPY.contactSub}</p>
      </Reveal>

      {/* TESTE: mesh gradient atrás do formulário (o vidro fosco do cartão pega a cor) */}
      <MeshBackdrop intensity="subtle" animated={false} className="contact__panel">
        <Reveal delay={200} className="contact__actions">
          <ContactForm />

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
      </MeshBackdrop>
    </section>
  );
}
