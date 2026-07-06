import { describe, expect, it } from "vitest";
import { getSeverityLabel } from "./dashboard-model";

describe("dashboard model", () => {
  it("maps critical severity to an action label", () => {
    expect(getSeverityLabel("critical")).toBe("Action required");
  });
});
