"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_FORM, whatsappUrl } from "@/content/home.config";
import { IconArrow } from "@/components/icons";

/**
 * Sem backend/CMS (ver CLAUDE.md do projeto irmão — mesma filosofia aqui: nada de servidor
 * até existir necessidade real). O envio abre o WhatsApp com a mensagem já escrita a partir
 * dos campos — funciona em qualquer aparelho, sem depender de app de e-mail instalado.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const type = String(data.get("type") || "");
    const message = String(data.get("message") || "");

    const lines = [
      "Novo projeto — site BIRO.mov",
      `${CONTACT_FORM.nameLabel}: ${name}`,
      `${CONTACT_FORM.emailLabel}: ${email}`,
      ...(type ? [`${CONTACT_FORM.typeLabel}: ${type}`] : []),
      "",
      message,
    ];

    window.open(`${whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <form className="cform" onSubmit={handleSubmit}>
      <div className="cform__head">
        <div>
          <h3 className="cform__title">{CONTACT_FORM.cardTitle}</h3>
          <p className="cform__sub">{CONTACT_FORM.cardSub}</p>
        </div>
        <span className="cform__status">
          <span className="cform__dot" aria-hidden />
          {CONTACT_FORM.statusLabel}
        </span>
      </div>

      <div className="cform__row">
        <label className="cform__field">
          <span>{CONTACT_FORM.nameLabel}</span>
          <input type="text" name="name" placeholder={CONTACT_FORM.namePlaceholder} autoComplete="name" required />
        </label>
        <label className="cform__field">
          <span>{CONTACT_FORM.emailLabel}</span>
          <input type="email" name="email" placeholder={CONTACT_FORM.emailPlaceholder} autoComplete="email" required />
        </label>
      </div>

      {/* o campo de WhatsApp saiu: a conversa já acontece no WhatsApp de quem envia */}
      <label className="cform__field">
        <span>{CONTACT_FORM.typeLabel}</span>
        <select name="type" defaultValue="">
          <option value="">{CONTACT_FORM.typePlaceholder}</option>
          {CONTACT_FORM.typeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="cform__field">
        <span>{CONTACT_FORM.messageLabel}</span>
        <textarea name="message" placeholder={CONTACT_FORM.messagePlaceholder} rows={5} required />
      </label>

      <button type="submit" className="btn btn--solid cform__submit">
        {CONTACT_FORM.submitLabel}
        <IconArrow size={18} />
      </button>

      {sent && <p className="cform__note" role="status">Abrindo o WhatsApp com a mensagem pronta para enviar…</p>}
    </form>
  );
}
