"use client";

/* eslint-disable react-hooks/immutability */

import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { CAMERA_VIEWS, MOBILITY_AREAS, MOBILITY_MARKERS } from "@/config/mobility-city";
import type { Locale } from "@/content/types";
import { getMobilityCityProduct, pickMobilityText } from "@/content/mobility-city/mobility-city";
import type { MobilityView } from "@/types/mobility-city";
import { MobilityCityModel } from "@/components/hero/MobilityCityModel";
import type { MobilityArea, MobilityModelStatus } from "@/types/mobility-city";

interface MobilityCitySceneProps {
  hoveredArea: MobilityArea | null;
  selectedArea: MobilityArea | null;
  view: MobilityView;
  reducedMotion: boolean;
  resetSignal: number;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
  onStatusChange: (status: MobilityModelStatus) => void;
  showMarkers: boolean;
  locale: Locale;
}

function CameraController({
  view,
  reducedMotion,
  enabled,
  resetSignal
}: {
  view: MobilityView;
  reducedMotion: boolean;
  enabled: boolean;
  resetSignal: number;
}) {
  const { camera, invalidate } = useThree();
  const target = useRef(new Vector3(...CAMERA_VIEWS.overview.target));
  const resetActive = useRef(false);
  const targetPosition = useMemo(() => new Vector3(...CAMERA_VIEWS[view].position), [view]);
  const targetLookAt = useMemo(() => new Vector3(...CAMERA_VIEWS[view].target), [view]);
  const targetFov = CAMERA_VIEWS[view].fov;

  useEffect(() => {
    camera.lookAt(target.current);
    invalidate();
  }, [camera, invalidate, targetFov, targetLookAt, targetPosition]);

  useEffect(() => {
    if (resetSignal > 0 && view === "overview") {
      resetActive.current = true;
      invalidate();
    }
  }, [invalidate, resetSignal, view]);

  useEffect(() => {
    if (reducedMotion) {
      camera.position.copy(targetPosition);
      target.current.copy(targetLookAt);
      camera.lookAt(target.current);

      if ("fov" in camera) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }

      invalidate();
    }
  }, [camera, invalidate, reducedMotion, targetFov, targetLookAt, targetPosition]);

  useFrame(() => {
    if (reducedMotion || (!enabled && !resetActive.current)) {
      return;
    }

    const positionDistance = camera.position.distanceTo(targetPosition);
    const targetDistance = target.current.distanceTo(targetLookAt);
    const fovDistance = "fov" in camera ? Math.abs(camera.fov - targetFov) : 0;

    if (positionDistance < 0.004 && targetDistance < 0.004 && fovDistance < 0.02) {
      resetActive.current = false;
      return;
    }

    camera.position.lerp(targetPosition, 0.09);
    target.current.lerp(targetLookAt, 0.1);
    camera.lookAt(target.current);

    if ("fov" in camera) {
      camera.fov += (targetFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();
    }

    invalidate();
  });

  return null;
}

function MobilityCityMarkers({
  hoveredArea,
  selectedArea,
  locale,
  onAreaHover,
  onAreaSelect
}: {
  hoveredArea: MobilityArea | null;
  selectedArea: MobilityArea | null;
  locale: Locale;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
}) {
  if (selectedArea) {
    return null;
  }

  return (
    <>
      {MOBILITY_AREAS.map((area) => {
        const product = getMobilityCityProduct(area);
        const active = hoveredArea === area;

        return (
          <Html key={area} position={MOBILITY_MARKERS[area].position} center zIndexRange={[6, 0]} className="mobility-city-marker-host">
            <button
              type="button"
              className={`mobility-city-marker mobility-city-marker--${area} ${active ? "is-active" : ""}`}
              aria-label={pickMobilityText(locale, product.name)}
              onPointerEnter={() => onAreaHover(area)}
              onPointerLeave={() => onAreaHover(null)}
              onFocus={() => onAreaHover(area)}
              onBlur={() => onAreaHover(null)}
              onPointerDown={(event) => {
                event.stopPropagation();
                onAreaSelect(area);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onAreaSelect(area);
              }}
            >
              <span className="mobility-city-marker__dot" aria-hidden="true" />
              <span className="mobility-city-marker__label">{pickMobilityText(locale, product.name)}</span>
            </button>
          </Html>
        );
      })}
    </>
  );
}

export function MobilityCityScene({
  hoveredArea,
  selectedArea,
  view,
  reducedMotion,
  resetSignal,
  onAreaHover,
  onAreaSelect,
  onStatusChange,
  showMarkers,
  locale
}: MobilityCitySceneProps) {
  const debug = process.env.NEXT_PUBLIC_DEBUG_MOBILITY_CITY === "true";

  return (
    <>
      <ambientLight intensity={0.28} color="#f8fbff" />
      <hemisphereLight args={["#ffffff", "#cbdbe3", 0.72]} />
      <directionalLight
        castShadow
        position={[4.8, 7.2, -4.6]}
        intensity={2.65}
        color="#fff5ea"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5.4}
        shadow-camera-right={5.4}
        shadow-camera-top={5.4}
        shadow-camera-bottom={-5.4}
        shadow-camera-near={0.2}
        shadow-camera-far={18}
        shadow-bias={-0.00022}
        shadow-normalBias={0.035}
      />
      <ContactShadows position={[0, -0.015, 0]} opacity={0.28} scale={8.5} blur={2.8} far={4.5} resolution={512} color="#52616a" frames={1} />
      <CameraController view={view} reducedMotion={reducedMotion} enabled={view !== "overview"} resetSignal={resetSignal} />
      <MobilityCityModel
        hoveredArea={hoveredArea}
        selectedArea={selectedArea}
        reducedMotion={reducedMotion}
        onAreaHover={onAreaHover}
        onAreaSelect={onAreaSelect}
        onStatusChange={onStatusChange}
      />
      {showMarkers ? (
        <MobilityCityMarkers
          hoveredArea={hoveredArea}
          selectedArea={selectedArea}
          locale={locale}
          onAreaHover={onAreaHover}
          onAreaSelect={onAreaSelect}
        />
      ) : null}
      <OrbitControls
        enabled={view === "overview" || debug}
        target={CAMERA_VIEWS.overview.target}
        enableDamping
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.08}
        rotateSpeed={0.35}
        minPolarAngle={0.72}
        maxPolarAngle={1.38}
        makeDefault
      />
    </>
  );
}
