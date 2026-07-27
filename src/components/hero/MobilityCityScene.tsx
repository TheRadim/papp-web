"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { CAMERA_VIEWS } from "@/config/mobility-city";
import type { MobilityView } from "@/types/mobility-city";
import { MobilityCityModel } from "@/components/hero/MobilityCityModel";
import type { MobilityArea, MobilityModelStatus } from "@/types/mobility-city";

interface MobilityCitySceneProps {
  hoveredArea: MobilityArea | null;
  selectedArea: MobilityArea | null;
  view: MobilityView;
  reducedMotion: boolean;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
  onStatusChange: (status: MobilityModelStatus) => void;
}

function CameraController({ view, reducedMotion }: { view: MobilityView; reducedMotion: boolean }) {
  const { camera } = useThree();
  const target = useRef(new Vector3(...CAMERA_VIEWS.overview.target));
  const targetPosition = useMemo(() => new Vector3(...CAMERA_VIEWS[view].position), [view]);
  const targetLookAt = useMemo(() => new Vector3(...CAMERA_VIEWS[view].target), [view]);
  const targetFov = CAMERA_VIEWS[view].fov;

  useEffect(() => {
    if (reducedMotion) {
      camera.position.copy(targetPosition);
      target.current.copy(targetLookAt);
      camera.lookAt(target.current);

      if ("fov" in camera) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }
  }, [camera, reducedMotion, targetFov, targetLookAt, targetPosition]);

  useFrame(() => {
    if (reducedMotion) {
      return;
    }

    camera.position.lerp(targetPosition, 0.075);
    target.current.lerp(targetLookAt, 0.085);
    camera.lookAt(target.current);

    if ("fov" in camera) {
      camera.fov += (targetFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

export function MobilityCityScene({
  hoveredArea,
  selectedArea,
  view,
  reducedMotion,
  onAreaHover,
  onAreaSelect,
  onStatusChange
}: MobilityCitySceneProps) {
  const debug = process.env.NEXT_PUBLIC_DEBUG_MOBILITY_CITY === "true";

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} />
      <CameraController view={view} reducedMotion={reducedMotion} />
      <MobilityCityModel
        hoveredArea={hoveredArea}
        selectedArea={selectedArea}
        reducedMotion={reducedMotion}
        onAreaHover={onAreaHover}
        onAreaSelect={onAreaSelect}
        onStatusChange={onStatusChange}
      />
      {debug ? <OrbitControls enablePan={false} makeDefault /> : null}
    </>
  );
}
