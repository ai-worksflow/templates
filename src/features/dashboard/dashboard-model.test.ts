import { describe, expect, it } from "vitest";
import { getUsageRatio } from "./dashboard-model";

describe("dashboard model", () => {
  it("caps usage ratio at 1", () => {
    expect(getUsageRatio({ key: "x", label: "x", value: "x", quota: 10, used: 20 })).toBe(1);
  });

  it("handles invalid quota", () => {
    expect(getUsageRatio({ key: "x", label: "x", value: "x", quota: 0, used: 20 })).toBe(0);
  });
});
