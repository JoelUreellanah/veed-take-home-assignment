import { Prisma } from "@prisma/client";
import { parseTags } from "../utils/parseTags";
import {
  NormalizedVideosFilterQuery,
  VideosFilterQuery,
} from "../schemas/videos.schema";
import { prisma } from "../lib/prisma";

export async function findVideos(
  filters: Prisma.VideoWhereInput,
  sortBy?: "newest" | "oldest",
  page = 1,
  pageSize = 10
) {
  const orderBy: Prisma.VideoOrderByWithRelationInput | undefined =
    sortBy === "newest"
      ? { created_at: Prisma.SortOrder.desc }
      : sortBy === "oldest"
      ? { created_at: Prisma.SortOrder.asc }
      : undefined;

  const [total, videos] = await Promise.all([
    prisma.video.count({ where: filters }),
    prisma.video.findMany({
      where: filters,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    }),
  ]);

  return { total, videos };
}

export function normalizeQuery(query: VideosFilterQuery) {
  return {
    search: query.search?.trim().toLowerCase(),
    tags: parseTags(query.tags || []),
    startDate: query.startDate ? new Date(query.startDate) : undefined,
    endDate: query.endDate ? new Date(query.endDate) : undefined,
    sortBy: query.sortBy,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
  };
}

export function buildVideoFilters(
  query: NormalizedVideosFilterQuery
): Prisma.VideoWhereInput {
  const filters: Prisma.VideoWhereInput[] = [];

  if (query.search?.trim()) {
    filters.push({
      title: {
        contains: query.search.trim().toLowerCase(),
        mode: "insensitive",
      },
    });
  }

  const parsedTags = parseTags(query.tags || []);
  if (parsedTags.length) {
    filters.push({ tags: { hasEvery: parsedTags } });
  }

  if (query.startDate) {
    filters.push({ created_at: { gte: new Date(query.startDate) } });
  }

  if (query.endDate) {
    filters.push({ created_at: { lte: new Date(query.endDate) } });
  }

  return filters.length ? { AND: filters } : {};
}

export async function createVideo(data: {
  title: string;
  tags?: string[];
  thumbnailUrl?: string;
  createdAt?: string;
  duration?: number;
  views?: number;
}) {
  return await prisma.video.create({
    data: {
      title: data.title,
      tags: data.tags ?? [],
      thumbnail_url: data.thumbnailUrl ?? "https://picsum.photos/300/200",
      created_at: data.createdAt ? new Date(data.createdAt) : new Date(),
      duration: Math.floor(Math.random() * 300) + 60, // <- this should be a separate process that determines the duration of the video
      views: data.views ?? 0,
    },
  });
}
