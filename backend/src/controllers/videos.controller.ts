import type { FastifyReply, FastifyRequest } from "fastify";
import type { VideosQuery } from "../schemas/videos.schema";
import {
  normalizeQuery,
  buildVideoFilters,
  findVideos,
  createVideo,
} from "../services/video.service";

export async function getVideosHandler(
  request: FastifyRequest<{ Querystring: VideosQuery }>,
  reply: FastifyReply
) {
  try {
    const normalized = normalizeQuery(request.query);
    const filters = buildVideoFilters(normalized);
    const result = await findVideos(
      filters,
      normalized.sortBy,
      normalized.page,
      normalized.pageSize
    );
    return reply.send(result);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: "InternalServerError",
      message: "Failed to retrieve videos",
    });
  }
}

export async function createVideoHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { title, tags, thumbnailUrl, createdAt, duration, views } =
      request.body as any;

    if (!title) {
      return reply.status(400).send({ error: "Title is required" });
    }

    const newVideo = await createVideo({
      title,
      tags,
      thumbnailUrl,
      createdAt,
      duration,
      views,
    });

    return reply.status(201).send(newVideo);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: "Failed to create video" });
  }
}
