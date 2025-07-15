import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import videosRoutes from "./routes/videos.route";
import videoRoutes from "./routes/video.route";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { registerErrorHandler } from "./plugins/errorHandler";

dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

export async function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.register(cors, { origin: process.env.CORS_ORIGIN || "*" });
  app.register(videosRoutes);
  app.register(videoRoutes);

  registerErrorHandler(app);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  return app;
}

if (require.main === module) {
  buildApp().then((app) => {
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`Server ready at ${address}`);
    });
  });
}
