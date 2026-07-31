"use client";

import { Canvas } from "@react-three/fiber";
import { Component, ReactNode, Suspense, useEffect } from "react";
import { CAMERA_VIEWS } from "@/config/mobility-city";
import { MobilityCityScene } from "@/components/hero/MobilityCityScene";
import type { Locale } from "@/content/types";
import type { MobilityArea, MobilityModelStatus, MobilityView } from "@/types/mobility-city";

interface MobilityCityCanvasProps {
  hoveredArea: MobilityArea | null;
  selectedArea: MobilityArea | null;
  view: MobilityView;
  reducedMotion: boolean;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
  onReturnToOverview: () => void;
  onStatusChange: (status: MobilityModelStatus) => void;
  showMarkers: boolean;
  locale: Locale;
}

interface MobilityCityErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

class MobilityCityErrorBoundary extends Component<MobilityCityErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[MobilityCity] Failed to render interactive model", error);
    }

    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function LoadingStatus({ onStatusChange }: { onStatusChange: (status: MobilityModelStatus) => void }) {
  useEffect(() => {
    onStatusChange("loading");
  }, [onStatusChange]);

  return null;
}

export default function MobilityCityCanvas({
  hoveredArea,
  selectedArea,
  view,
  reducedMotion,
  onAreaHover,
  onAreaSelect,
  onReturnToOverview,
  onStatusChange,
  showMarkers,
  locale
}: MobilityCityCanvasProps) {
  return (
    <MobilityCityErrorBoundary onError={() => onStatusChange("error")}>
      <Canvas
        className="mobility-city__canvas"
        camera={{ position: CAMERA_VIEWS.overview.position, fov: CAMERA_VIEWS.overview.fov }}
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onPointerMissed={onReturnToOverview}
      >
        <Suspense fallback={<LoadingStatus onStatusChange={onStatusChange} />}>
          <MobilityCityScene
            hoveredArea={hoveredArea}
            selectedArea={selectedArea}
            view={view}
            reducedMotion={reducedMotion}
            onAreaHover={onAreaHover}
            onAreaSelect={onAreaSelect}
            onStatusChange={onStatusChange}
            showMarkers={showMarkers}
            locale={locale}
          />
        </Suspense>
      </Canvas>
    </MobilityCityErrorBoundary>
  );
}
