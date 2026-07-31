import type { Object3D } from "three";
import type { Locale } from "@/content/types";
import type { MobilityArea, MobilityView } from "@/types/mobility-city";

export const MOBILITY_CITY_MODEL_URL = "/models/papp-city-test.glb";

export const CITY_OBJECT_NAMES = {
  base: "City_Base",
  sensors: "Sensors_Test",
  cameras: "Camera_Test",
  insights: "Insights_Test"
} as const;

export const MOBILITY_AREAS: MobilityArea[] = ["sensors", "cameras", "insights"];

export const MOBILITY_AREA_ANCHORS: Record<MobilityArea, string> = {
  sensors: "solution-sensors",
  cameras: "solution-cameras",
  insights: "solution-insights"
};

export const MOBILITY_MARKERS: Record<MobilityArea, { position: [number, number, number] }> = {
  sensors: {
    position: [-0.25, 0.32, 1.62]
  },
  cameras: {
    position: [0.08, 1.18, 0.92]
  },
  insights: {
    position: [0.36, 1.45, -0.6]
  }
};

export const CAMERA_VIEWS: Record<MobilityView, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  overview: {
    position: [4.35, 3.05, 5.75],
    target: [0, 0.45, 0.55],
    fov: 37
  },
  sensors: {
    position: [1.55, 1.42, 3.08],
    target: [0, 0.15, 1.7],
    fov: 27
  },
  cameras: {
    position: [1.62, 1.74, 2.75],
    target: [0, 0.95, 1.05],
    fov: 28
  },
  insights: {
    position: [1.78, 1.62, 1.1],
    target: [0, 0.85, -0.58],
    fov: 27
  }
};

export function mobilityProductPath(locale: Locale, area: MobilityArea) {
  return `/${locale}/products/${area}`;
}

export function getMobilityAreaFromObject(object: Object3D): MobilityArea | null {
  let current: Object3D | null = object;

  while (current) {
    const area = MOBILITY_AREAS.find((candidate) => current?.name === CITY_OBJECT_NAMES[candidate]);

    if (area) {
      return area;
    }

    current = current.parent;
  }

  return null;
}
