import Image from "next/image";
import type { Locale } from "@/content/types";
import { mobilityCityLabels, pickMobilityText } from "@/content/mobility-city/mobility-city";
import { withBasePath } from "@/lib/site/basePath";
import type { MobilityModelStatus } from "@/types/mobility-city";

interface MobilityCityFallbackProps {
  locale: Locale;
  status?: MobilityModelStatus;
}

export function MobilityCityFallback({ locale, status = "idle" }: MobilityCityFallbackProps) {
  const showStatus = status === "loading" || status === "error";

  return (
    <div className="mobility-city__fallback">
      <Image
        src={withBasePath("/images/hero/mobility-city-visual.png")}
        alt={locale === "da" ? "Miniatureby med parkering, kamera og dataoverblik" : "Miniature city with parking, camera and data overview"}
        width={1672}
        height={941}
        priority
        sizes="(max-width: 992px) 100vw, 64vw"
      />
      {showStatus ? (
        <p className="mobility-city__status">
          {status === "loading" ? pickMobilityText(locale, mobilityCityLabels.loading) : pickMobilityText(locale, mobilityCityLabels.fallback)}
        </p>
      ) : null}
    </div>
  );
}
