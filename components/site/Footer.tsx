import { site } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="ftr">
      <span className="ftr__brand" translate="no">
        <span className="b-mark" aria-hidden>B</span>
        <span className="wordmark">
          {site.wordmark.light}
          <b>{site.wordmark.accent}</b>
        </span>
      </span>
      <span className="ftr__tag">{site.footerTag}</span>
      <span style={{ fontSize: 12, color: "var(--edge)" }}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
