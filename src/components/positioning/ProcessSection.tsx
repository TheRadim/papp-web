import type { HomeContent } from "@/content/home/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessSectionProps {
  content: HomeContent["process"];
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section id="movement-meaning" className="process-section" aria-label={content.title} role="region" tabIndex={0}>
      <div className="process-section__intro">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} align="center" />
      </div>
      <div className="process-scroll-wrap">
        <div className="process-scroll-pin">
          <div className="process-flow" aria-label={content.title}>
            {content.steps.map((step, index) => (
              <article className={`process-flow__step process-flow__step--${index + 1}`} key={step.title}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="process-scroll-dots" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div className="process-section__outro" aria-hidden="true" />
    </section>
  );
}
