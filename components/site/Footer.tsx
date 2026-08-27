import { site } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="ftr">
      <span className="wordmark">
        {site.wordmark.light}
        <b>{site.wordmark.accent}</b>
      </span>
      <span className="ftr__tag">{site.footerTag}</span>
      <span style={{ fontSize: 12, color: "var(--edge)" }}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
