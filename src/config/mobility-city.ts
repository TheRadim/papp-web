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

export const CAMERA_VIEWS: Record<MobilityView, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  overview: {
    position: [3.4, 2.6, 4.6],
    target: [0, 0.45, 0.55],
    fov: 34
  },
  sensors: {
    position: [1.6, 1.45, 3.35],
    target: [0, 0.15, 1.7],
    fov: 28
  },
  cameras: {
    position: [1.55, 1.7, 2.6],
    target: [0, 0.95, 1.05],
    fov: 27
  },
  insights: {
    position: [1.9, 1.7, 1.1],
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
