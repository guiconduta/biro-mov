"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT, NAV, mailUrl, telUrl } from "@/content/home.config";
import { IconClose, IconInstagram, IconMail, IconYoutube } from "@/components/icons";

type NavLink = { label: string; href: string };

function NavColumn({ links, onClick }: { links: readonly NavLink[]; onClick?: () => void }) {
  return (
    <ul className="nav__col">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="nav__link" onClick={onClick}>
            <span>{l.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      <li>
        <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="socials__a">
          <IconInstagram />
        </a>
      </li>
      <li>
        <a href={CONTACT.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="socials__a">
          <IconYoutube />
        </a>
      </li>
      <li>
        <a href={mailUrl} aria-label={`E-mail: ${CONTACT.email}`} className="socials__a">
          <IconMail />
        </a>
      </li>
    </ul>
  );
}

export function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // headroom: some ao descer, volta ao subir (e sempre que algo dentro dele recebe foco)
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const goingDown = y > last + 4;
      const goingUp = y < last - 4;
      if (y < 80 || goingUp) setHidden(false);
      else if (goingDown) setHidden(true);
      if (goingDown || goingUp) last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // menu mobile: trava scroll, Esc fecha, foco entra no menu
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className={"nav" + (hidden && !open ? " nav--hidden" : "")}>
        <nav aria-label="Principal" className="nav__cols">
          <NavColumn links={[...NAV.col1, ...NAV.col2]} />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-bars" aria-hidden />
          <span>Menu</span>
        </button>

        <div className="nav__contact">
          <a href={telUrl} className="nav__phone">{CONTACT.phoneDisplay}</a>
          <Socials />
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={menuRef}
        className="menu"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <button type="button" className="menu__close" onClick={close} aria-label="Fechar menu">
          <IconClose size={26} />
        </button>
        <nav aria-label="Menu mobile" className="menu__nav">
          <NavColumn links={[...NAV.col1, ...NAV.col2]} onClick={() => setOpen(false)} />
        </nav>
        <div className="menu__foot">
          <a href={telUrl} className="nav__phone">{CONTACT.phoneDisplay}</a>
          <Socials />
        </div>
      </div>
    </>
  );
}
