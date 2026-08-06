import Image from "next/image";
import { Activity, Database, ShieldCheck } from "lucide-react";
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
            <div className="hero-data-card" aria-label={locale === "da" ? "Papp datalag" : "Papp data layer"}>
              <div>
                <Database aria-hidden="true" size={18} />
                <span>{locale === "da" ? "Sensorer" : "Sensors"}</span>
              </div>
              <div>
                <Activity aria-hidden="true" size={18} />
                <span>{locale === "da" ? "Live monitorering" : "Live monitoring"}</span>
              </div>
              <div>
                <ShieldCheck aria-hidden="true" size={18} />
                <span>{locale === "da" ? "Beslutningsklar data" : "Decision-ready data"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
