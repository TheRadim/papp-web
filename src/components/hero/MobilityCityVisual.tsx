"use client";

import Image from "next/image";
import { useState } from "react";

export type MobilityArea = "sensors" | "cameras" | "insights";

interface MobilityCityVisualProps {
  activeArea?: MobilityArea | null;
  onAreaHover?: (area: MobilityArea | null) => void;
  onAreaSelect?: (area: MobilityArea) => void;
  interactive?: boolean;
  visualMode?: "image" | "video" | "3d";
  locale: "en" | "da";
}

const hotspots: Array<{ area: MobilityArea; x: string; y: string; label: Record<"en" | "da", string>; target: string }> = [
  { area: "sensors", x: "35%", y: "70%", label: { en: "Explore parking sensors", da: "Udforsk parkeringssensorer" }, target: "sensors" },
  { area: "cameras", x: "55%", y: "48%", label: { en: "Explore camera analytics", da: "Udforsk kameraanalyse" }, target: "cameras" },
  { area: "insights", x: "77%", y: "22%", label: { en: "Explore Papp Insights", da: "Udforsk Papp Insights" }, target: "insights" }
];

export function MobilityCityVisual({
  activeArea = null,
  onAreaHover,
  onAreaSelect,
  interactive = true,
  visualMode = "image",
  locale
}: MobilityCityVisualProps) {
  const [localActive, setLocalActive] = useState<MobilityArea | null>(null);
  const current = activeArea ?? localActive;

  function select(area: MobilityArea, target: string) {
    onAreaSelect?.(area);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <figure className={`mobility-visual mobility-visual--${visualMode}`} data-active={current ?? "none"}>
      <Image
        src="/images/hero/mobility-city-visual.png"
        alt={locale === "da" ? "Miniatureby med vej, parkering, kamera og dataoverblik" : "Miniature city with road, parking, camera and data overview"}
        width={1672}
        height={941}
        priority
        sizes="(max-width: 992px) 100vw, 54vw"
      />
      {interactive
        ? hotspots.map((hotspot) => (
            <button
              key={hotspot.area}
              type="button"
              className={`mobility-hotspot ${current === hotspot.area ? "is-active" : ""}`}
              style={{ left: hotspot.x, top: hotspot.y }}
              aria-label={hotspot.label[locale]}
              onMouseEnter={() => {
                setLocalActive(hotspot.area);
                onAreaHover?.(hotspot.area);
              }}
              onMouseLeave={() => {
                setLocalActive(null);
                onAreaHover?.(null);
              }}
              onFocus={() => {
                setLocalActive(hotspot.area);
                onAreaHover?.(hotspot.area);
              }}
              onBlur={() => {
                setLocalActive(null);
                onAreaHover?.(null);
              }}
              onClick={() => select(hotspot.area, hotspot.target)}
            >
              <span>{hotspot.label[locale].replace(locale === "da" ? "Udforsk " : "Explore ", "")}</span>
            </button>
          ))
        : null}
    </figure>
  );
}
