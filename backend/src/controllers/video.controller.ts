import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function getVideoByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const video = await prisma.video.findUnique({
    where: { id: request.params.id },
  });

  if (!video) {
    return reply
      .status(404)
      .send({ error: "NotFoundError", message: "Video not found" });
  }

  return reply.send(video);
}
