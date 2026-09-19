import { WORKFLOW_DATA } from "@/content/home.config";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Container do "Como trabalho". O flow animado entra depois: cada etapa já sai com
 * data-step + --i, e o root tem data-workflow para ancorar timeline/scroll-trigger.
 */
export function Workflow() {
  return (
    <section id="como-trabalho" className="workflow" aria-labelledby="workflow-label" data-workflow>
      <Reveal>
        <h2 id="workflow-label" className="label">COMO TRABALHO</h2>
      </Reveal>

      {WORKFLOW_DATA.length > 0 ? (
        <ol className="workflow__steps">
          {WORKFLOW_DATA.map((s, i) => (
            <li key={i} className="workflow__step" data-step={i + 1} style={{ ["--i" as string]: i }}>
              <span className="workflow__n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="workflow__title">{s.title}</h3>
              <p className="workflow__text">{s.text}</p>
            </li>
          ))}
        </ol>
      ) : (
        <Reveal delay={100}>
          <p className="workflow__empty todo">[WORKFLOW_DATA]</p>
        </Reveal>
      )}
    </section>
  );
}
