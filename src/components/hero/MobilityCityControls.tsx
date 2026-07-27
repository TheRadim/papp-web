import type { Locale } from "@/content/types";
import { MOBILITY_AREAS } from "@/config/mobility-city";
import { getMobilityCityProduct, mobilityCityLabels, pickMobilityText } from "@/content/mobility-city/mobility-city";
import type { MobilityArea } from "@/types/mobility-city";

interface MobilityCityControlsProps {
  activeArea: MobilityArea | null;
  locale: Locale;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
}

export function MobilityCityControls({ activeArea, locale, onAreaHover, onAreaSelect }: MobilityCityControlsProps) {
  return (
    <div className="mobility-city__controls" aria-label={pickMobilityText(locale, mobilityCityLabels.choose)}>
      {MOBILITY_AREAS.map((area) => {
        const product = getMobilityCityProduct(area);

        return (
          <button
            key={area}
            type="button"
            className={`mobility-city__control ${activeArea === area ? "is-active" : ""}`}
            aria-pressed={activeArea === area}
            onMouseEnter={() => onAreaHover(area)}
            onMouseLeave={() => onAreaHover(null)}
            onFocus={() => onAreaHover(area)}
            onBlur={() => onAreaHover(null)}
            onClick={() => onAreaSelect(area)}
          >
            {pickMobilityText(locale, product.name)}
          </button>
        );
      })}
    </div>
  );
}
