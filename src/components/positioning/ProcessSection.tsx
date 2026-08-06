import type { HomeContent } from "@/content/home/home";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessSectionProps {
  content: HomeContent["process"];
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <Section id="movement-meaning" tone="soft" className="process-section">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} align="center" />
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
    </Section>
  );
}
