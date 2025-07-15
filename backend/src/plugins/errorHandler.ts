import { FastifyError, FastifyInstance } from 'fastify';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error);
    reply.status(error.statusCode || 500).send({
      error: error.name,
      message: error.message || 'Internal Server Error',
    });
  });

  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ message: 'Route not found' });
  });
}
