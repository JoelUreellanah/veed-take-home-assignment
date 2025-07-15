import { FastifyInstance } from 'fastify';
import { getVideoByIdHandler } from '../controllers/video.controller';

export default async function videoRoutes(fastify: FastifyInstance) {
  fastify.get('/videos/:id', getVideoByIdHandler);
}