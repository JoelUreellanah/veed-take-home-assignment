import { FastifyInstance } from "fastify";
import {
  createVideoHandler,
  getVideosHandler,
} from "../controllers/videos.controller";
import { videosQuerySchema } from "../schemas/videos.schema";

export default async function videosRoutes(fastify: FastifyInstance) {
  fastify.get("/videos", {
    schema: {
      querystring: videosQuerySchema,
    },
    handler: getVideosHandler,
  });
  fastify.post("/videos", {
    handler: createVideoHandler,
  });
}
