const TILES = [
  "linear-gradient(135deg, #0c3b30, #0a6a5a)",
  "linear-gradient(135deg, #0a6a5a, #a7d8c2)",
  "var(--iridescent)",
  "linear-gradient(135deg, #6f7fb6, #e3b78f)",
  "linear-gradient(135deg, #05100c, #124a3b)",
];

export function MotionStrip() {
  return (
    <section className="motion-strip" aria-hidden>
      <div className="wrap">
        <div className="topic" style={{ marginBottom: 22 }}>
          <span className="eyebrow">Motion Color</span>
          <span className="topic__rule" />
        </div>
        <div className="motion-tiles">
          {TILES.map((bg, i) => (
            <span
              key={i}
              className={"motion-tile" + (i === 2 ? " motion-tile--iri" : "")}
              style={{ background: bg }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
