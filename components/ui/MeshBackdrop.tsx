import type { CSSProperties, ReactNode } from "react";
import s from "./MeshBackdrop.module.css";

/**
 * Fundo decorativo "mesh gradient" dark/moody (esmeralda, teal e âmbar emergindo do preto),
 * com grão cinematográfico e borda interna fina. CSS puro, sem JS.
 * intensity: "subtle" (padrão) | "vivid". animated: manchas derivando devagar (padrão true).
 */
export function MeshBackdrop({
  intensity = "subtle",
  animated = true,
  radius,
  className = "",
  style,
  children,
}: {
  intensity?: "subtle" | "vivid";
  animated?: boolean;
  radius?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const cls = [s.root, intensity === "vivid" ? s.vivid : "", animated ? "" : s.still, className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ ...(radius ? { ["--r" as string]: radius } : null), ...style }}>
      <div className={s.field} aria-hidden>
        <span className={`${s.blob} ${s.b1}`} />
        <span className={`${s.blob} ${s.b2}`} />
        <span className={`${s.blob} ${s.b3}`} />
        <span className={`${s.blob} ${s.b4}`} />
        <span className={`${s.blob} ${s.b5}`} />
      </div>
      <div className={s.vignette} aria-hidden />
      <div className={s.grain} aria-hidden />
      {children && <div className={s.content}>{children}</div>}
    </div>
  );
}
