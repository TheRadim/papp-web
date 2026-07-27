"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { MobilityCityControls } from "@/components/hero/MobilityCityControls";
import { MobilityCityDetails } from "@/components/hero/MobilityCityDetails";
import { MobilityCityFallback } from "@/components/hero/MobilityCityFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { MobilityArea, MobilityModelStatus, MobilityView } from "@/types/mobility-city";

const MobilityCityCanvas = dynamic(() => import("./MobilityCityCanvas"), {
  ssr: false,
  loading: () => null
});

interface MobilityCityVisualProps {
  activeArea?: MobilityArea | null;
  initialView?: MobilityView;
  onAreaHover?: (area: MobilityArea | null) => void;
  onAreaSelect?: (area: MobilityArea) => void;
  onReturnToOverview?: () => void;
  interactive?: boolean;
  visualMode?: "image" | "video" | "3d";
  className?: string;
  locale: Locale;
}

function browserSupportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useDesktop3dEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 992px)");

    function update() {
      setEnabled(query.matches && browserSupportsWebGL());
    }

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export function MobilityCityVisual({
  activeArea = null,
  initialView = "overview",
  onAreaHover,
  onAreaSelect,
  onReturnToOverview,
  interactive = true,
  visualMode = "3d",
  className = "",
  locale
}: MobilityCityVisualProps) {
  const reducedMotion = useReducedMotion();
  const desktop3dEnabled = useDesktop3dEnabled();
  const [hoveredArea, setHoveredArea] = useState<MobilityArea | null>(activeArea);
  const [selectedArea, setSelectedArea] = useState<MobilityArea | null>(initialView === "overview" ? null : initialView);
  const [modelStatus, setModelStatus] = useState<MobilityModelStatus>("idle");

  const canUse3d = interactive && visualMode === "3d" && desktop3dEnabled;
  const activeDisplayArea = selectedArea ?? activeArea ?? hoveredArea;
  const view: MobilityView = selectedArea ?? "overview";

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  const handleHover = useCallback(
    (area: MobilityArea | null) => {
      setHoveredArea(area);
      onAreaHover?.(area);
    },
    [onAreaHover]
  );

  const handleSelect = useCallback(
    (area: MobilityArea) => {
      setSelectedArea(area);
      setHoveredArea(area);
      onAreaSelect?.(area);
    },
    [onAreaSelect]
  );

  const handleReturnToOverview = useCallback(() => {
    setSelectedArea(null);
    setHoveredArea(null);
    onReturnToOverview?.();
  }, [onReturnToOverview]);

  return (
    <figure
      className={`mobility-city ${canUse3d ? "mobility-city--3d" : "mobility-city--fallback"} ${className}`.trim()}
      data-status={modelStatus}
      data-active={activeDisplayArea ?? "none"}
    >
      <div className="mobility-city__stage">
        {!canUse3d || modelStatus !== "ready" ? <MobilityCityFallback locale={locale} status={modelStatus} /> : null}
        {canUse3d ? (
          <MobilityCityCanvas
            hoveredArea={hoveredArea}
            selectedArea={selectedArea}
            view={view}
            reducedMotion={reducedMotion}
            onAreaHover={handleHover}
            onAreaSelect={handleSelect}
            onReturnToOverview={handleReturnToOverview}
            onStatusChange={setModelStatus}
          />
        ) : null}
        <MobilityCityDetails area={activeDisplayArea} locale={locale} selected={Boolean(selectedArea)} onReturnToOverview={handleReturnToOverview} />
      </div>
      <MobilityCityControls activeArea={activeDisplayArea} locale={locale} onAreaHover={handleHover} onAreaSelect={handleSelect} />
    </figure>
  );
}
