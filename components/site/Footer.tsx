import { site } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="ftr">
      <span className="wordmark" translate="no">
        {site.wordmark.light.toLowerCase()}
        <b>{site.wordmark.accent.toLowerCase()}</b>
      </span>
      <span className="ftr__tag">{site.footerTag}</span>
      <span style={{ fontWeight: 300, fontSize: 12, color: "var(--edge)" }}>
        © {new Date().getFullYear()}
      </span>
    </footer>
  );
}
