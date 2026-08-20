"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
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
  lockedArea?: MobilityArea | null;
  onAreaHover?: (area: MobilityArea | null) => void;
  onAreaSelect?: (area: MobilityArea) => void;
  onReturnToOverview?: () => void;
  interactive?: boolean;
  visualMode?: "image" | "video" | "3d";
  showDetails?: boolean;
  showMarkers?: boolean;
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
  const [state, setState] = useState({ enabled: false, resolved: false });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 992px)");

    function update() {
      setState({ enabled: query.matches && browserSupportsWebGL(), resolved: true });
    }

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return state;
}

function useNearViewport(rootMargin = "420px 0px") {
  const ref = useRef<HTMLElement | null>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return { ref, nearViewport };
}

export function MobilityCityVisual({
  activeArea = null,
  initialView = "overview",
  lockedArea = null,
  onAreaHover,
  onAreaSelect,
  onReturnToOverview,
  interactive = true,
  visualMode = "3d",
  showDetails = true,
  showMarkers = true,
  className = "",
  locale
}: MobilityCityVisualProps) {
  const reducedMotion = useReducedMotion();
  const desktop3d = useDesktop3dEnabled();
  const { ref, nearViewport } = useNearViewport(lockedArea ? "24px 0px" : "420px 0px");
  const [hoveredArea, setHoveredArea] = useState<MobilityArea | null>(activeArea);
  const [selectedArea, setSelectedArea] = useState<MobilityArea | null>(lockedArea ?? (initialView === "overview" ? null : initialView));
  const [modelStatus, setModelStatus] = useState<MobilityModelStatus>("idle");

  const wants3d = interactive && visualMode === "3d";
  const canUse3d = wants3d && desktop3d.enabled && nearViewport;
  const showImageFallback = !wants3d || (desktop3d.resolved && !desktop3d.enabled) || modelStatus === "error";
  const showLoadingPlate = wants3d && !showImageFallback && modelStatus !== "ready";
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
      if (lockedArea) {
        return;
      }

      setSelectedArea(area);
      setHoveredArea(null);
      onAreaHover?.(null);
      onAreaSelect?.(area);
    },
    [lockedArea, onAreaHover, onAreaSelect]
  );

  const handleReturnToOverview = useCallback(() => {
    setSelectedArea(lockedArea ?? null);
    setHoveredArea(null);
    onReturnToOverview?.();
  }, [lockedArea, onReturnToOverview]);

  return (
    <figure
      ref={ref}
      className={`mobility-city ${canUse3d ? "mobility-city--3d" : "mobility-city--fallback"} ${className}`.trim()}
      data-status={modelStatus}
      data-active={activeDisplayArea ?? "none"}
    >
      <div className="mobility-city__stage">
        {showLoadingPlate ? (
          <div className="mobility-city__loading" aria-label={locale === "da" ? "Indlæser 3D-model" : "Loading 3D model"}>
            <span />
            <p>{locale === "da" ? "Indlæser mobilitetsmodel" : "Loading mobility model"}</p>
          </div>
        ) : null}
        {showImageFallback ? <MobilityCityFallback locale={locale} status={modelStatus} /> : null}
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
            showMarkers={showMarkers}
            locale={locale}
          />
        ) : null}
        {showDetails && selectedArea ? <MobilityCityDetails area={selectedArea} locale={locale} selected onReturnToOverview={handleReturnToOverview} /> : null}
      </div>
    </figure>
  );
}
