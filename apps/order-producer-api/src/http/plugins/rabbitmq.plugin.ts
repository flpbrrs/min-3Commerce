import { publish } from "@3c/rabbit-queue";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

export const rabbitMQPlugin = fastifyPlugin(
    async (app: FastifyInstance) => {
        app.decorate("queuePublish", publish)
    }
)