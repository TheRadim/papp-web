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
  "PappCamera selectable": "cameras",
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
    position: [3.9, 1.94, -5.12],
    target: [-0.08, -0.4, -0.82],
    fov: 42.5
  },
  sensors: {
    position: [2.05, 0.44, -1.08],
    target: [0.95, 0.04, -0.95],
    fov: 17
  },
  cameras: {
    position: [0.9, 1.32, -2.9],
    target: [0.35, 1.07, -2.18],
    fov: 16.5
  },
  insights: {
    position: [0.38, 1.72, -2.72],
    target: [-1.61, 1.36, -1.05],
    fov: 24
  }
};

export function mobilityProductPath(locale: Locale, area: MobilityArea) {
  return `/${locale}/products/${area}`;
}

export function getMobilityAreaFromObject(object: Object3D): MobilityArea | null {
  let current: Object3D | null = object;

  while (current) {
    const alias = CITY_OBJECT_AREA_ALIASES[current.name];

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
