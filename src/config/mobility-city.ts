import type { Object3D } from "three";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";
import type { MobilityArea, MobilityView } from "@/types/mobility-city";

export const MOBILITY_CITY_MODEL_URL = withBasePath("/models/model-onehouse.glb");

export const CITY_OBJECT_NAMES = {
  base: "parking",
  sensors: "PappSensor",
  cameras: "PappCamera",
  insights: "PappInsights"
} as const;

export const CITY_OBJECT_AREA_ALIASES: Record<string, MobilityArea> = {
  "parking selectable": "sensors",
  "pappsensor selectable": "sensors",
  "papp sensor selectable": "sensors",
  "PappCamera selectable": "cameras",
  "pappcamera selectable": "cameras",
  "papp camera selectable": "cameras",
  "PappCamera pole": "cameras"
};

export const MOBILITY_AREAS: MobilityArea[] = ["sensors", "cameras", "insights"];

export const MOBILITY_AREA_ANCHORS: Record<MobilityArea, string> = {
  sensors: "solution-sensors",
  cameras: "solution-cameras",
  insights: "solution-insights"
};

export const MOBILITY_MARKERS: Record<MobilityArea, { position: [number, number, number] }> = {
  sensors: {
    position: [0.95, 0.2, -0.72]
  },
  cameras: {
    position: [0.31, 0.74, -2.15]
  },
  insights: {
    position: [-1.62, 1.62, -1.05]
  }
};

export const CAMERA_VIEWS: Record<MobilityView, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  overview: {
    position: [4.45, 2.06, -5.18],
    target: [-0.12, -0.42, -0.9],
    fov: 53
  },
  sensors: {
    position: [2.48, 0.82, -1.84],
    target: [0.94, -0.04, -0.74],
    fov: 42
  },
  cameras: {
    position: [0.98, 1.5, -3.34],
    target: [0.08, 0.82, -2.06],
    fov: 38
  },
  insights: {
    position: [0.42, 1.94, -3.16],
    target: [-1.66, 1.04, -1.06],
    fov: 44
  }
};

export function mobilityProductPath(locale: Locale, area: MobilityArea) {
  return `/${locale}/products/${area}`;
}

export function getMobilityAreaFromObject(object: Object3D): MobilityArea | null {
  let current: Object3D | null = object;

  while (current) {
    const normalizedName = current.name.trim().toLowerCase().replace(/[_-]+/g, " ");
    const alias = CITY_OBJECT_AREA_ALIASES[current.name] ?? CITY_OBJECT_AREA_ALIASES[normalizedName];

    if (alias) {
      return alias;
    }

    const area = MOBILITY_AREAS.find((candidate) => {
      const targetName = CITY_OBJECT_NAMES[candidate];
      return current?.name === targetName || current?.name.startsWith(`${targetName}_`);
    });

    if (area) {
      return area;
    }

    current = current.parent;
  }

  return null;
}
