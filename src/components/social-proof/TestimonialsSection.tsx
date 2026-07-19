import type { Locale } from "@/content/types";
import { getTestimonials } from "@/lib/content/accessors";
import { pick } from "@/lib/i18n/locales";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsSectionProps {
  locale: Locale;
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const testimonials = getTestimonials(locale);

  return (
    <Section>
      <SectionHeading
        eyebrow={locale === "da" ? "Tillid" : "Trust"}
        title={locale === "da" ? "Hvad samarbejdet gør muligt" : "What collaboration makes possible"}
        body={locale === "da" ? "Korte, forsigtige uddrag baseret på eksisterende testimonialmateriale." : "Short, cautious excerpts based on current testimonial material."}
      />
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.slug}>
            <p>“{pick(locale, testimonial.quote)}”</p>
            <strong>{testimonial.organisation}</strong>
          </article>
        ))}
      </div>
    </Section>
  );
}
