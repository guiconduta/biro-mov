"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, CONTACT_FORM } from "@/content/home.config";
import { IconArrow } from "@/components/icons";

/**
 * Sem backend/CMS (ver CLAUDE.md do projeto irmão — mesma filosofia aqui: nada de servidor
 * até existir necessidade real). O envio monta um e-mail (mailto:) com os dados preenchidos
 * e abre o app de e-mail do visitante — zero infraestrutura, funciona hoje.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = `Novo projeto — ${name || "site BIRO.mov"}`;
    const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
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

      <label className="cform__field">
        <span>{CONTACT_FORM.messageLabel}</span>
        <textarea name="message" placeholder={CONTACT_FORM.messagePlaceholder} rows={5} required />
      </label>

      <button type="submit" className="btn btn--solid cform__submit">
        {CONTACT_FORM.submitLabel}
        <IconArrow size={18} />
      </button>

      {sent && <p className="cform__note" role="status">Abrindo seu app de e-mail com a mensagem pronta para enviar…</p>}
    </form>
  );
}
