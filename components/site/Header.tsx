import Link from "next/link";
import { site } from "@/lib/catalog";

const NAV = [
  ["Work", "/work", true],
  ["Selected", "#selected", false],
  ["Clients", "#clients", false],
  ["Process", "#process", false],
  ["About", "#about", false],
] as const;

export function Header() {
  return (
    <header className="hdr">
      <a className="wordmark" href="#top" translate="no">
        {site.wordmark.light.toLowerCase()}
        <b>{site.wordmark.accent.toLowerCase()}</b>
      </a>

      <nav className="hdr__nav">
        {NAV.map(([label, href, isRoute]) =>
          isRoute ? (
            <Link key={label} href={href}>{label}</Link>
          ) : (
            <a key={label} href={href}>{label}</a>
          ),
        )}
        <a className="hdr__cta" href="#contact">Falar no WhatsApp</a>
      </nav>
    </header>
  );
}
