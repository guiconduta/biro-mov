import type { Metadata } from "next";
import { MeshBackdrop } from "@/components/ui/MeshBackdrop";

// Página de teste: fora do menu, fora do sitemap e fora do Google.
export const metadata: Metadata = {
  title: "Laboratório",
  robots: { index: false, follow: false },
};

const label: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--text-mute)",
  marginBottom: 14,
};

export default function LabPage() {
  return (
    <main style={{ padding: "clamp(28px, 5vw, 72px) var(--pad)", minHeight: "100svh", display: "grid", gap: 40, alignContent: "start" }}>
      <p style={label}>Laboratório · mesh gradient</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 28 }}>
        <section>
          <p style={label}>01 · Sutil</p>
          <MeshBackdrop intensity="subtle" style={{ aspectRatio: "16 / 10" }} />
        </section>
        <section>
          <p style={label}>02 · Intenso</p>
          <MeshBackdrop intensity="vivid" style={{ aspectRatio: "16 / 10" }} />
        </section>
      </div>
    </main>
  );
}
