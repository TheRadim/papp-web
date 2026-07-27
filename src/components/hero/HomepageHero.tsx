import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { Button } from "@/components/ui/Button";
import { MobilityCityVisual } from "@/components/hero/MobilityCityVisual";

interface HomepageHeroProps {
  locale: Locale;
  content: HomeContent["hero"];
}

export function HomepageHero({ locale, content }: HomepageHeroProps) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 aria-label={content.title}>
              <span className="hero-title-word hero-title-word--papp">Papp</span>
              <span className="hero-title-word hero-title-word--mobility">Mobility</span>
            </h1>
            <p className="hero-kicker">{content.eyebrow}</p>
          </div>
          <div className="hero-visual-panel">
            <MobilityCityVisual locale={locale} />
          </div>
        </div>
        <div className="hero-bottom">
          <p className="hero-lead">{content.body}</p>
          <div className="hero-actions">
            <Button href={`/${locale}/solutions`} variant="secondary" className="hero-action hero-action--blue">
              {content.primaryCta}
            </Button>
            <Button href={`/${locale}/projects`} variant="secondary" className="hero-action hero-action--salmon">
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
