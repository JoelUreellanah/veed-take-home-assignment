import { describe, it, expect } from "vitest";
import { parseTags } from "../../src/utils/parseTags";

describe("parseTags", () => {
  it("parses comma-separated string into array", () => {
    expect(parseTags("one,two")).toEqual(["one", "two"]);
  });

  it("returns input array if already array", () => {
    expect(parseTags(["a", "b"])).toEqual(["a", "b"]);
  });

  it("returns empty array for undefined input", () => {
    expect(parseTags(undefined)).toEqual([]);
  });
});
