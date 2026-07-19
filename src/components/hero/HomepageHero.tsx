import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { Button } from "@/components/ui/Button";

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
            <Image
              src="/images/hero/mobility-city-visual.png"
              alt=""
              width={1672}
              height={941}
              priority
              sizes="(max-width: 992px) 118vw, 72vw"
            />
            <Link className="hero-hotspot hero-hotspot--sensors" href={`/${locale}/products/sensors`}>
              <span>
                <strong>{locale === "da" ? "Sensorer" : "Sensors"}</strong>
                <em>{locale === "da" ? "Måler belægning og opholdstid i realtid." : "Measure occupancy and dwell time in real time."}</em>
              </span>
            </Link>
            <Link className="hero-hotspot hero-hotspot--cameras" href={`/${locale}/products/cameras`}>
              <span>
                <strong>{locale === "da" ? "Kameraer" : "Cameras"}</strong>
                <em>{locale === "da" ? "Registrerer flow og adfærd uden persondata." : "Capture flow and behaviour without personal data."}</em>
              </span>
            </Link>
            <Link className="hero-hotspot hero-hotspot--insights" href={`/${locale}/products/insights`}>
              <span>
                <strong>{locale === "da" ? "Intelligens" : "Intelligence"}</strong>
                <em>{locale === "da" ? "Samler data til klare beslutninger." : "Turns mobility data into clear next steps."}</em>
              </span>
            </Link>
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
