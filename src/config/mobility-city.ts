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

export const MOBILITY_AREAS: MobilityArea[] = ["sensors", "cameras", "insights"];

export const MOBILITY_AREA_ANCHORS: Record<MobilityArea, string> = {
  sensors: "solution-sensors",
  cameras: "solution-cameras",
  insights: "solution-insights"
};

export const MOBILITY_MARKERS: Record<MobilityArea, { position: [number, number, number] }> = {
  sensors: {
    position: [0.95, 0.24, 0.36]
  },
  cameras: {
    position: [0.32, 1.28, -2.15]
  },
  insights: {
    position: [-1.62, 1.72, -1.05]
  }
};

export const CAMERA_VIEWS: Record<MobilityView, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  overview: {
    position: [4.55, 3.05, 4.45],
    target: [-0.45, 0.58, -0.58],
    fov: 34
  },
  sensors: {
    position: [2.15, 1.2, 1.95],
    target: [0.95, 0.14, 0.36],
    fov: 24
  },
  cameras: {
    position: [1.75, 1.75, -0.85],
    target: [0.32, 1.02, -2.15],
    fov: 24
  },
  insights: {
    position: [0.65, 1.95, 0.45],
    target: [-1.62, 1.26, -1.05],
    fov: 25
  }
};

export function mobilityProductPath(locale: Locale, area: MobilityArea) {
  return `/${locale}/products/${area}`;
}

export function getMobilityAreaFromObject(object: Object3D): MobilityArea | null {
  let current: Object3D | null = object;

  while (current) {
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
