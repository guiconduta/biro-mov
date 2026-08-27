import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LiteYouTube } from "@/components/LiteYouTube";
import { getCase, getFeaturedCases, getVideo, getVideosOfProject } from "@/lib/catalog";

export function generateStaticParams() {
  return getFeaturedCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Case" };
  return { title: c.title, description: c.summary };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const videos = c.videoOrder.length
    ? c.videoOrder.map((id) => getVideo(id)).filter(Boolean)
    : getVideosOfProject(c.projectId);

  return (
    <>
      <Header />
      <main className="wrap section">
        <span className="eyebrow">Case</span>
        <h1 className="h-section" style={{ marginTop: 14 }}>{c.title}</h1>
        <p style={{ color: "var(--text-dim)", maxWidth: "60ch", marginTop: 16 }}>{c.summary}</p>

        {c.metrics && c.metrics.length > 0 && (
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", margin: "40px 0" }}>
            {c.metrics.map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: 40, fontWeight: 600, color: "var(--accent)" }}>{m.value}</div>
                <div className="eyebrow">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {c.sections.map((s, i) => (
          <section key={i} style={{ marginTop: 40, maxWidth: "62ch" }}>
            {s.heading && <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-hi)", marginBottom: 12 }}>{s.heading}</h2>}
            <p style={{ color: "var(--text-dim)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{s.body}</p>
          </section>
        ))}

        {videos.length > 0 && (
          <div className="reel-grid" style={{ marginTop: 56 }}>
            {videos.map((v) => (
              <div key={v!.id} style={{ aspectRatio: "9 / 16", borderRadius: "var(--r-card)", overflow: "hidden", border: "1px solid var(--hairline)" }}>
                <LiteYouTube id={v!.youtubeId} title={v!.title} poster={v!.poster} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {videos.map((v) => (
        <script
          key={v!.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: v!.title,
              description: c.summary,
              thumbnailUrl: v!.poster || `https://i.ytimg.com/vi/${v!.youtubeId}/hqdefault.jpg`,
              embedUrl: `https://www.youtube.com/embed/${v!.youtubeId}`,
              uploadDate: "2026-01-01",
            }),
          }}
        />
      ))}
    </>
  );
}
