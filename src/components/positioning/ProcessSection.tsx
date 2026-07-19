import type { HomeContent } from "@/content/home/home";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessSectionProps {
  content: HomeContent["process"];
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <Section tone="soft">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} align="center" />
      <div className="process-grid">
        {content.steps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
