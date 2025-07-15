import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../src/index";
import { prisma } from "../../src/lib/prisma";

let app: Awaited<ReturnType<typeof buildApp>>;

beforeAll(async () => {
  app = await buildApp();
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});

describe("GET /videos", () => {
  it("returns videos with pagination", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/videos?page=1&pageSize=5",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(Array.isArray(body.videos)).toBe(true);
    expect(typeof body.total).toBe("number");
  });

  it("filters videos by tag", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/videos?tags=music",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(Array.isArray(body.videos)).toBe(true);
    if (body.videos.length) {
      expect(body.videos.every((v: any) => v.tags.includes("music"))).toBe(
        true
      );
    }
  });
});
