import { describe, expect, it } from "vitest";
import { getPriorityWeight } from "./dashboard-model";

describe("dashboard model", () => {
  it("orders priorities by operational severity", () => {
    expect(getPriorityWeight("P0")).toBeGreaterThan(getPriorityWeight("P1"));
    expect(getPriorityWeight("P1")).toBeGreaterThan(getPriorityWeight("P2"));
  });
});
