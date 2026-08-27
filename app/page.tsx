// PLACEHOLDER da Fase 3 — prova de que a camada de dados carrega.
// A Home real é construída na Fase 5, a partir de design-foundation.md.

import {
  getCategories,
  getClients,
  getLibrary,
  getVideos,
  getCapabilities,
  site,
} from "@/lib/catalog";

export default function Page() {
  const videos = getVideos();
  const library = getLibrary();
  const categories = getCategories();
  const clients = getClients();
  const capabilities = getCapabilities();

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 720, margin: "40px auto", padding: "0 20px", lineHeight: 1.6 }}>
      <h1>{site.name} — camada de dados</h1>
      <p style={{ color: "#666" }}>
        Placeholder da Fase 3. {videos.length} vídeos públicos · {library.length} na
        biblioteca · {categories.length} categorias · {clients.length} clientes ·{" "}
        {capabilities.length} capacidades. pricingEnabled = {String(site.flags.pricingEnabled)}.
      </p>

      <h2>Categorias</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.label} <code>{c.id}</code>
          </li>
        ))}
      </ul>

      <h2>Primeiros 5 vídeos</h2>
      <ol>
        {videos.slice(0, 5).map((v) => (
          <li key={v.id}>
            {v.title} — <code>{v.category}</code> — {v.format} —{" "}
            {"grade" in v ? "VAZAMENTO!" : "ok (sem grade)"}
          </li>
        ))}
      </ol>
    </main>
  );
}
