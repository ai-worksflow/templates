import { describe, expect, it } from "vitest";
import { getRiskLevel } from "./dashboard-model";

describe("dashboard model", () => {
  it("orders risk levels by severity", () => {
    expect(getRiskLevel({ id: "1", title: "x", owner: "x", status: "Open", risk: "High" })).toBeGreaterThan(
      getRiskLevel({ id: "2", title: "x", owner: "x", status: "Open", risk: "Medium" }),
    );
  });
});
