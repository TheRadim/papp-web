import Link from "next/link";
import type { MouseEvent } from "react";
import type { Locale } from "@/content/types";
import { MOBILITY_AREA_ANCHORS, mobilityProductPath } from "@/config/mobility-city";
import { getMobilityCityProduct, mobilityCityLabels, pickMobilityText } from "@/content/mobility-city/mobility-city";
import type { MobilityArea } from "@/types/mobility-city";

interface MobilityCityDetailsProps {
  area: MobilityArea | null;
  locale: Locale;
  selected: boolean;
  onReturnToOverview: () => void;
}

export function MobilityCityDetails({ area, locale, selected, onReturnToOverview }: MobilityCityDetailsProps) {
  if (!area) {
    return null;
  }

  const product = getMobilityCityProduct(area);

  if (selected) {
    const anchor = MOBILITY_AREA_ANCHORS[area];

    function handleLearnMore(event: MouseEvent<HTMLAnchorElement>) {
      event.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
      <aside className="mobility-city__panel mobility-city__panel--selected" aria-live="polite">
        <button className="mobility-city__close" type="button" onClick={onReturnToOverview} aria-label={pickMobilityText(locale, mobilityCityLabels.close)}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h2>{pickMobilityText(locale, product.name)}</h2>
        <p>{pickMobilityText(locale, product.description)}</p>
        <a className="mobility-city__learn mobility-city__learn--selected" href={`#${anchor}`} onClick={handleLearnMore}>
          {pickMobilityText(locale, mobilityCityLabels.learnMore)}
        </a>
      </aside>
    );
  }

  return (
    <aside className="mobility-city__panel" aria-live="polite">
      <p className="mobility-city__eyebrow">{pickMobilityText(locale, selected ? mobilityCityLabels.overview : mobilityCityLabels.productArea)}</p>
      <h2>{pickMobilityText(locale, product.name)}</h2>
      <p>{pickMobilityText(locale, product.description)}</p>
      <div className="mobility-city__panel-actions">
        <Link className="mobility-city__learn" href={mobilityProductPath(locale, area)}>
          {pickMobilityText(locale, product.cta)}
        </Link>
        {selected ? (
          <button className="mobility-city__back" type="button" onClick={onReturnToOverview}>
            {pickMobilityText(locale, mobilityCityLabels.back)}
          </button>
        ) : null}
      </div>
    </aside>
  );
}
