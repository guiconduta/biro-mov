import Link from "next/link";
import { site } from "@/lib/catalog";

const NAV = [
  ["Selected", "#selected"],
  ["Clients", "#clients"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  return (
    <header className="hdr">
      <a className="hdr__brand" href="#top" aria-label={site.name} translate="no">
        <span className="b-mark" aria-hidden>B</span>
        <span className="wordmark">
          {site.wordmark.light}
          <b>{site.wordmark.accent}</b>
        </span>
      </a>

      <nav className="hdr__nav">
        <Link href="/work">Work</Link>
        {NAV.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="hdr__right">
        <span className="hud" aria-hidden translate="no">
          <span className="hud__dot" /> REC <span style={{ color: "var(--edge)" }}>00:00:04:20</span>
        </span>
        <a className="btn-pill" href="#contact">
          Vamos conversar
        </a>
      </div>
    </header>
  );
}
