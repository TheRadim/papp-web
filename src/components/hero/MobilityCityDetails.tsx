import Link from "next/link";
import type { Locale } from "@/content/types";
import { mobilityProductPath } from "@/config/mobility-city";
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
    return (
      <aside className="mobility-city__panel mobility-city__panel--idle" aria-live="polite">
        <p>{pickMobilityText(locale, mobilityCityLabels.choose)}</p>
      </aside>
    );
  }

  const product = getMobilityCityProduct(area);

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
