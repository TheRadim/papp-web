"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  const [active, setActive] = useState(0);

  const previous = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <Section className="testimonials-section">
      <SectionHeading
        eyebrow={locale === "da" ? "Tillid" : "Trust"}
        title={locale === "da" ? "Hvad samarbejdet gør muligt" : "What collaboration makes possible"}
        body={
          locale === "da"
            ? "Udvalgte erfaringer fra kommuner og partnere, hvor data har gjort beslutninger lettere at diskutere."
            : "Selected experiences from municipalities and partners where data made decisions easier to discuss."
        }
        align="center"
      />
      <div className="testimonial-carousel">
        <button type="button" className="testimonial-arrow testimonial-arrow--left" onClick={previous} aria-label={locale === "da" ? "Forrige" : "Previous"}>
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <div className="testimonial-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <article className={`testimonial-card ${index === active ? "is-active" : ""}`} key={testimonial.slug}>
              <Quote aria-hidden="true" size={34} />
              <p>{pick(locale, testimonial.quote)}</p>
              <div>
                <span>{testimonial.organisation.slice(0, 1)}</span>
                <strong>{testimonial.organisation}</strong>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="testimonial-arrow testimonial-arrow--right" onClick={next} aria-label={locale === "da" ? "Næste" : "Next"}>
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((testimonial, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            key={testimonial.slug}
            onClick={() => setActive(index)}
            aria-label={`${locale === "da" ? "Vis" : "Show"} ${testimonial.organisation}`}
          />
        ))}
      </div>
    </Section>
  );
}
