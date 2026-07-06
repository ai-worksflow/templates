import { describe, expect, it } from "vitest";
import { getCompletionLabel } from "./dashboard-model";

describe("dashboard model", () => {
  it("labels high completion as excellent", () => {
    expect(getCompletionLabel(95)).toBe("Excellent");
  });
});
