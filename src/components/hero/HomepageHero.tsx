import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { Button } from "@/components/ui/Button";
import { HeroMotionField } from "@/components/hero/HeroMotionField";
import { withBasePath } from "@/lib/site/basePath";

interface HomepageHeroProps {
  locale: Locale;
  content: HomeContent["hero"];
}

export function HomepageHero({ locale, content }: HomepageHeroProps) {
  return (
    <section className="hero-section">
      <HeroMotionField />
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 className="hero-title">{content.title}</h1>
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
              src={withBasePath("/images/corporate/insights-screen.jpg")}
              alt=""
              width={1920}
              height={1080}
              priority
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 992px) 100vw, 48vw"
            />
            <div className="hero-system" aria-label={locale === "da" ? "Live mobilitetsdata" : "Live mobility data"}>
              <div className="hero-system__header">
                <span>{locale === "da" ? "Live datalag" : "Live data layer"}</span>
                <strong>98.4%</strong>
              </div>
              <div className="hero-system__chart" aria-hidden="true">
                <span className="hero-system__chart-line hero-system__chart-line--blue" />
                <span className="hero-system__chart-line hero-system__chart-line--coral" />
                <i style={{ "--point-x": "15%", "--point-y": "63%" } as CSSProperties} />
                <i style={{ "--point-x": "43%", "--point-y": "38%" } as CSSProperties} />
                <i style={{ "--point-x": "78%", "--point-y": "28%" } as CSSProperties} />
              </div>
              <div className="hero-system__rows">
                <span>{locale === "da" ? "Belægning" : "Occupancy"}<strong>Live</strong></span>
                <span>{locale === "da" ? "Flow" : "Flow"}<strong>+12%</strong></span>
                <span>{locale === "da" ? "Opholdstid" : "Dwell"}<strong>24m</strong></span>
              </div>
            </div>
            <div className="hero-scanline" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
