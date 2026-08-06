import Image from "next/image";
import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { Button } from "@/components/ui/Button";
import { withBasePath } from "@/lib/site/basePath";

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
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
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
          </div>
          <div className="hero-image-stage">
            <Image
              src={withBasePath("/images/corporate/insights-meeting-city.jpg")}
              alt=""
              width={1920}
              height={1080}
              priority
              loading="eager"
              sizes="(max-width: 992px) 100vw, 48vw"
            />
            <span className="hero-image-label hero-image-label--one">{locale === "da" ? "Indsigt" : "Insights"}</span>
            <span className="hero-image-label hero-image-label--two">{locale === "da" ? "Analyse" : "Analysis"}</span>
            <span className="hero-image-label hero-image-label--three">{locale === "da" ? "Beslutninger" : "Decisions"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
