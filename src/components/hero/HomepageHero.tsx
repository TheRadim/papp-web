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
  const title =
    locale === "da"
      ? "Mobilitetsintelligens til byer og operatører"
      : "Mobility intelligence for cities and operators";

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-layout hero-layout--corporate">
          <div className="hero-copy">
            <p className="eyebrow">{content.title}</p>
            <h1>{title}</h1>
          </div>
          <div className="hero-summary">
            <p>{content.lead}</p>
            <div className="hero-actions">
              <Button href={`/${locale}/solutions`} variant="dark" className="hero-action hero-action--blue">
                {content.primaryCta}
              </Button>
              <Button href={`/${locale}/projects`} variant="text" className="hero-action hero-action--salmon">
                {content.secondaryCta}
              </Button>
            </div>
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
            sizes="100vw"
          />
          <span className="hero-image-label hero-image-label--one">{locale === "da" ? "Indsigt" : "Insights"}</span>
          <span className="hero-image-label hero-image-label--two">{locale === "da" ? "Analyse" : "Analysis"}</span>
          <span className="hero-image-label hero-image-label--three">{locale === "da" ? "Beslutninger" : "Decisions"}</span>
        </div>
      </div>
    </section>
  );
}
