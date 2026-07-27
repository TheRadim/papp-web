import { describe, expect, it } from "vitest";
import { Object3D } from "three";
import { CITY_OBJECT_NAMES, getMobilityAreaFromObject, mobilityProductPath } from "@/config/mobility-city";
import { getMobilityCityProduct } from "@/content/mobility-city/mobility-city";

describe("interactive mobility city config", () => {
  it("keeps Blender object names centralised", () => {
    expect(CITY_OBJECT_NAMES).toEqual({
      base: "City_Base",
      sensors: "Sensors_Test",
      cameras: "Camera_Test",
      insights: "Insights_Test"
    });
  });

  it("maps child meshes back to their mobility area", () => {
    const root = new Object3D();
    root.name = CITY_OBJECT_NAMES.cameras;
    const child = new Object3D();
    root.add(child);

    expect(getMobilityAreaFromObject(child)).toBe("cameras");
  });

  it("does not make the base object selectable", () => {
    const base = new Object3D();
    base.name = CITY_OBJECT_NAMES.base;

    expect(getMobilityAreaFromObject(base)).toBeNull();
  });

  it("uses the current locale route shape", () => {
    expect(mobilityProductPath("en", "sensors")).toBe("/en/products/sensors");
    expect(mobilityProductPath("da", "cameras")).toBe("/da/products/cameras");
  });

  it("provides Danish and English product text", () => {
    expect(getMobilityCityProduct("insights").name.en).toBe("Papp Insights");
    expect(getMobilityCityProduct("sensors").description.da).toContain("belægning");
  });
});
