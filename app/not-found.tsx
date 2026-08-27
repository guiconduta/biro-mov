import Link from "next/link";
import { site } from "@/lib/catalog";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        textAlign: "center",
        padding: 24,
      }}
    >
      <span className="hud">
        <span className="hud__dot" /> NO SIGNAL — 404
      </span>
      <h1 style={{ fontSize: "clamp(40px,8vw,72px)", fontWeight: 700, letterSpacing: "-2px", color: "var(--text-hi)" }}>
        Fora de quadro.
      </h1>
      <p style={{ color: "var(--text-mute)", maxWidth: "42ch" }}>
        Essa página não existe (ou ainda não). Volte para o começo.
      </p>
      <Link className="btn-pill" href="/">
        {site.name}
      </Link>
    </main>
  );
}
