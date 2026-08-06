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
      <div className="process-flow" aria-label={content.title}>
        <svg className="process-flow__line" viewBox="0 0 1000 210" aria-hidden="true" preserveAspectRatio="none">
          <path d="M10 138 C 175 178, 260 42, 398 72 S 590 194, 708 104 S 870 32, 990 78" />
        </svg>
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
    </Section>
  );
}
