import Image from "next/image";
import type { Locale, Offering } from "@/content/types";
import { pick } from "@/lib/i18n/locales";
import { withBasePath } from "@/lib/site/basePath";
import { Button } from "@/components/ui/Button";
import { MobilityCityVisual } from "@/components/hero/MobilityCityVisual";
import type { MobilityArea } from "@/types/mobility-city";

interface OfferingFeatureProps {
  offering: Offering;
  locale: Locale;
  index: number;
}

export function OfferingFeature({ offering, locale, index }: OfferingFeatureProps) {
  const isService = offering.category === "analysis" || offering.category === "consultancy";
  const href = isService ? `/${locale}/services/${offering.slug}` : `/${locale}/products/${offering.slug}`;
  const mobilityArea = getMobilityArea(offering);

  return (
    <section id={mobilityArea ? `solution-${mobilityArea}` : offering.slug} className={`offering-feature ${index % 2 ? "offering-feature--reverse" : ""}`}>
      <div className={`offering-feature__visual ${mobilityArea ? "offering-feature__visual--model" : ""}`.trim()}>
        {mobilityArea ? (
          <MobilityCityVisual
            locale={locale}
            initialView={mobilityArea}
            lockedArea={mobilityArea}
            showDetails={false}
            showMarkers={false}
            className="mobility-city--section-model"
          />
        ) : (
          <Image src={withBasePath(offering.heroImage)} alt="" width={1672} height={941} sizes="(max-width: 992px) 100vw, 44vw" />
        )}
      </div>
      <div className="offering-feature__copy">
        <p className="eyebrow">{offering.eyebrow ? pick(locale, offering.eyebrow) : ""}</p>
        <h2>{pick(locale, offering.name)}</h2>
        <p>{pick(locale, offering.introduction)}</p>
        <ul className="check-list">
          {offering.benefits.slice(0, 3).map((benefit) => (
            <li key={pick(locale, benefit)}>{pick(locale, benefit)}</li>
          ))}
        </ul>
        <Button href={href} variant={index === 2 ? "dark" : "secondary"}>
          {locale === "da" ? "Læs mere" : "Learn more"}
        </Button>
      </div>
    </section>
  );
}

function getMobilityArea(offering: Offering): MobilityArea | null {
  if (offering.category === "sensors" || offering.category === "cameras" || offering.category === "insights") {
    return offering.category;
  }

  return null;
}
