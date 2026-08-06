import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroMotionField } from "@/components/hero/HeroMotionField";

interface HomepageHeroProps {
  locale: Locale;
  content: HomeContent["hero"];
}

export function HomepageHero({ locale, content }: HomepageHeroProps) {
  return (
    <section className="hero-section">
      <HeroMotionField />
      <div className="container">
        <div className="hero-layout hero-layout--centered">
          <div className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 className="hero-title tracking-in-expand">{content.title}</h1>
            <p className="hero-lead">{content.lead}</p>
            <p>{content.body}</p>
            <div className="hero-actions">
              <Button href={`/${locale}/solutions`} variant="primary" className="hero-action hero-action--blue">
                {content.primaryCta}
              </Button>
              <Button href={`/${locale}/projects`} variant="text" className="hero-action hero-action--salmon">
                {content.secondaryCta}
              </Button>
            </div>
            <a className="hero-scroll-cue" href="#movement-meaning" aria-label={locale === "da" ? "Gå til næste sektion" : "Scroll to next section"}>
              <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
