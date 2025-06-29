import { publish } from "@3c/rabbit-queue";
import "fastify";

declare module "fastify" {
    interface FastifyInstance {
        queuePublish: typeof publish;
    }
}