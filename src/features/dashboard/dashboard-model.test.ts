import { describe, expect, it } from "vitest";
import { getIncompleteJobs, jobs } from "./dashboard-model";

describe("dashboard model", () => {
  it("filters completed jobs out of active operations", () => {
    expect(getIncompleteJobs(jobs).every((job) => job.state !== "Done")).toBe(true);
  });
});
