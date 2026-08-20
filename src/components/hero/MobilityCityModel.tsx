"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { AnimationMixer, Color, Group, LoopPingPong, Material, Mesh, MeshStandardMaterial, Object3D } from "three";
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
  sensors: new Color("#58bfe9"),
  cameras: new Color("#6dcaf0"),
  insights: new Color("#50b7e4")
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
        object.castShadow = true;
        object.receiveShadow = true;
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

  const baseScales = useMemo(() => {
    return MOBILITY_AREAS.reduce<Record<MobilityArea, Object3D["scale"] | null>>(
      (accumulator, area) => {
        accumulator[area] = roots[area]?.scale.clone() ?? null;
        return accumulator;
      },
      { sensors: null, cameras: null, insights: null }
    );
  }, [roots]);

  const mixer = useMemo(() => new AnimationMixer(model), [model]);

  useEffect(() => {
    if (reducedMotion || gltf.animations.length === 0) {
      return undefined;
    }

    const actions = gltf.animations.map((clip) => {
      const action = mixer.clipAction(clip);
      action.reset();
      action.setLoop(LoopPingPong, Infinity);
      action.timeScale = 0.44;
      action.clampWhenFinished = false;
      action.enabled = true;
      action.play();
      return action;
    });

    invalidate();

    return () => {
      actions.forEach((action) => action.stop());
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
    };
  }, [gltf.animations, invalidate, mixer, model, reducedMotion]);

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
    const activeArea = selectedArea ? null : hoveredArea;

    model.traverse((child) => {
      if (!(child instanceof Mesh)) {
        return;
      }

      const area = getMobilityAreaFromObject(child);

      if (!area) {
        return;
      }

      const active = area === activeArea;
      const muted = Boolean(activeArea && area !== activeArea);

      eachMaterial(child.material, (material) => applyMaterialState(material, active, muted, AREA_COLORS[area]));
    });
    invalidate();
  }, [hoveredArea, invalidate, model, selectedArea]);

  useFrame((_, delta) => {
    let needsAnotherFrame = !reducedMotion && gltf.animations.length > 0;

    if (needsAnotherFrame) {
      mixer.update(delta);
    }

    MOBILITY_AREAS.forEach((area) => {
      const object = roots[area];
      const baseScale = baseScales[area];

      if (!object || !baseScale) {
        return;
      }

      const factor = reducedMotion ? 1 : 0.14;
      const targetX = baseScale.x;
      const targetY = baseScale.y;
      const targetZ = baseScale.z;
      const scaleDelta = Math.max(Math.abs(object.scale.x - targetX), Math.abs(object.scale.y - targetY), Math.abs(object.scale.z - targetZ));
      object.scale.x += (targetX - object.scale.x) * factor;
      object.scale.y += (targetY - object.scale.y) * factor;
      object.scale.z += (targetZ - object.scale.z) * factor;

      if (scaleDelta > 0.002) {
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
