import { describe, it, expect } from "vitest";
import { buildVideoFilters } from "../../src/services/video.service";

describe("buildVideoFilters", () => {
  it("returns correct filter for search", () => {
    const result = buildVideoFilters({ search: "hello", tags: [] });
    expect(result).toEqual({
      AND: [{ title: { contains: "hello", mode: "insensitive" } }],
    });
  });

  it("returns correct filter for tags", () => {
    const result = buildVideoFilters({ tags: ["a", "b"] });
    expect(result).toEqual({
      AND: [{ tags: { hasEvery: ["a", "b"] } }],
    });
  });
});
