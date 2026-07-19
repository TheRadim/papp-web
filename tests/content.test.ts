import { describe, expect, it } from "vitest";
import { getOfferingBySlug, getProjects } from "@/lib/content/accessors";
import { company } from "@/content/global/company";

describe("Papp content model", () => {
  it("keeps unpublished projects hidden", () => {
    expect(getProjects("en").every((project) => project.published)).toBe(true);
  });

  it("exposes the required core offerings", () => {
    expect(getOfferingBySlug("en", "sensors")?.category).toBe("sensors");
    expect(getOfferingBySlug("da", "cameras")?.category).toBe("cameras");
    expect(getOfferingBySlug("en", "insights")?.category).toBe("insights");
  });

  it("uses the new contact email", () => {
    expect(company.email).toBe("hey@pappmobility.com");
  });
});
