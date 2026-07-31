"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Color, Group, Material, Mesh, MeshStandardMaterial, Object3D } from "three";
import { CITY_OBJECT_NAMES, getMobilityAreaFromObject, MOBILITY_AREAS, MOBILITY_CITY_MODEL_URL } from "@/config/mobility-city";
import type { MobilityArea, MobilityModelStatus } from "@/types/mobility-city";

interface MobilityCityModelProps {
  hoveredArea: MobilityArea | null;
  selectedArea: MobilityArea | null;
  reducedMotion: boolean;
  onAreaHover: (area: MobilityArea | null) => void;
  onAreaSelect: (area: MobilityArea) => void;
  onStatusChange: (status: MobilityModelStatus) => void;
}

interface MaterialSnapshot {
  color?: MeshStandardMaterial["color"];
  emissive?: MeshStandardMaterial["emissive"];
  emissiveIntensity?: number;
  opacity?: number;
  transparent?: boolean;
}

const AREA_COLORS: Record<MobilityArea, Color> = {
  sensors: new Color("#0786c5"),
  cameras: new Color("#ff7f7b"),
  insights: new Color("#0b5f8f")
};

function cloneMaterial(material: Material | Material[]) {
  return Array.isArray(material) ? material.map((item) => item.clone()) : material.clone();
}

function eachMaterial(material: Material | Material[], callback: (material: Material) => void) {
  if (Array.isArray(material)) {
    material.forEach(callback);
    return;
  }

  callback(material);
}

function rememberMaterial(material: Material) {
  const standard = material as MeshStandardMaterial;

  if (standard.userData.mobilityOriginal) {
    return standard.userData.mobilityOriginal as MaterialSnapshot;
  }

  const snapshot: MaterialSnapshot = {
    color: standard.color?.clone(),
    emissive: standard.emissive?.clone(),
    emissiveIntensity: standard.emissiveIntensity,
    opacity: standard.opacity,
    transparent: standard.transparent
  };

  standard.userData.mobilityOriginal = snapshot;
  return snapshot;
}

function applyMaterialState(material: Material, active: boolean, muted: boolean, activeColor: Color, mutedOpacity = 0.5) {
  const standard = material as MeshStandardMaterial;
  const snapshot = rememberMaterial(standard);

  if (snapshot.color && standard.color) {
    standard.color.copy(snapshot.color);

    if (active) {
      standard.color.lerp(activeColor, 0.58);
    }
  }

  if (snapshot.emissive && standard.emissive) {
    standard.emissive.copy(snapshot.emissive);

    if (active) {
      standard.emissive.copy(activeColor);
      standard.emissiveIntensity = 0.36;
    } else {
      standard.emissiveIntensity = snapshot.emissiveIntensity ?? 0;
    }
  }

  if (typeof snapshot.opacity === "number") {
    standard.opacity = muted ? Math.max(mutedOpacity, snapshot.opacity * mutedOpacity) : snapshot.opacity;
    standard.transparent = muted || Boolean(snapshot.transparent);
  }

  standard.needsUpdate = true;
}

function namedObject(scene: Object3D, objectName: string) {
  return scene.getObjectByName(objectName) ?? null;
}

export function MobilityCityModel({
  hoveredArea,
  selectedArea,
  reducedMotion,
  onAreaHover,
  onAreaSelect,
  onStatusChange
}: MobilityCityModelProps) {
  const gltf = useGLTF(MOBILITY_CITY_MODEL_URL);
  const { invalidate } = useThree();

  const model = useMemo(() => {
    const clone = gltf.scene.clone(true) as Group;

    clone.traverse((object) => {
      if (object instanceof Mesh) {
        object.material = cloneMaterial(object.material);
        object.castShadow = false;
        object.receiveShadow = false;
      }
    });

    return clone;
  }, [gltf.scene]);

  const roots = useMemo(() => {
    return MOBILITY_AREAS.reduce<Record<MobilityArea, Object3D | null>>(
      (accumulator, area) => {
        accumulator[area] = namedObject(model, CITY_OBJECT_NAMES[area]);
        return accumulator;
      },
      { sensors: null, cameras: null, insights: null }
    );
  }, [model]);

  const baseRoot = useMemo(() => namedObject(model, CITY_OBJECT_NAMES.base), [model]);

  useEffect(() => {
    onStatusChange("ready");

    if (process.env.NODE_ENV !== "production") {
      const names: string[] = [];
      model.traverse((object) => {
        names.push(`${object.name || "(unnamed)"}:${object.type}`);
      });
      console.debug("[MobilityCity] GLB hierarchy", names);

      MOBILITY_AREAS.forEach((area) => {
        if (!roots[area]) {
          console.warn(`[MobilityCity] Expected object "${CITY_OBJECT_NAMES[area]}" was not found in ${MOBILITY_CITY_MODEL_URL}.`);
        }
      });
    }
  }, [model, onStatusChange, roots]);

  useEffect(() => {
    const activeArea = selectedArea ?? hoveredArea;

    if (baseRoot) {
      baseRoot.traverse((child) => {
        if (child instanceof Mesh) {
          eachMaterial(child.material, (material) => applyMaterialState(material, false, Boolean(selectedArea), AREA_COLORS[selectedArea ?? "sensors"], 0.2));
        }
      });
    }

    MOBILITY_AREAS.forEach((area) => {
      const object = roots[area];
      if (!object) {
        return;
      }

      const active = area === activeArea;
      const muted = Boolean(activeArea && area !== activeArea);

      object.traverse((child) => {
        if (child instanceof Mesh) {
          eachMaterial(child.material, (material) => applyMaterialState(material, active, muted, AREA_COLORS[area]));
        }
      });
    });
    invalidate();
  }, [baseRoot, hoveredArea, invalidate, roots, selectedArea]);

  useFrame(() => {
    const activeArea = selectedArea ?? hoveredArea;
    let needsAnotherFrame = false;

    MOBILITY_AREAS.forEach((area) => {
      const object = roots[area];
      if (!object) {
        return;
      }

      const targetScale = selectedArea === area ? 1.07 : activeArea === area ? 1.08 : 1;
      const factor = reducedMotion ? 1 : 0.14;
      const delta = Math.abs(object.scale.x - targetScale);
      object.scale.x += (targetScale - object.scale.x) * factor;
      object.scale.y += (targetScale - object.scale.y) * factor;
      object.scale.z += (targetScale - object.scale.z) * factor;

      if (delta > 0.002) {
        needsAnotherFrame = true;
      }
    });

    if (needsAnotherFrame) {
      invalidate();
    }
  });

  function handlePointerEnter(event: ThreeEvent<PointerEvent>) {
    const area = getMobilityAreaFromObject(event.object);

    if (!area) {
      return;
    }

    event.stopPropagation();
    document.body.style.cursor = "pointer";
    onAreaHover(area);
  }

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    const area = getMobilityAreaFromObject(event.object);

    if (!area || area === hoveredArea) {
      return;
    }

    event.stopPropagation();
    document.body.style.cursor = "pointer";
    onAreaHover(area);
  }

  function handlePointerLeave(event: ThreeEvent<PointerEvent>) {
    const area = getMobilityAreaFromObject(event.object);

    if (!area) {
      return;
    }

    event.stopPropagation();
    document.body.style.cursor = "";
    onAreaHover(null);
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    const area = getMobilityAreaFromObject(event.object);

    if (!area) {
      return;
    }

    event.stopPropagation();
    onAreaSelect(area);
  }

  return <primitive object={model} onPointerOver={handlePointerEnter} onPointerMove={handlePointerMove} onPointerOut={handlePointerLeave} onClick={handleClick} />;
}

useGLTF.preload(MOBILITY_CITY_MODEL_URL);
