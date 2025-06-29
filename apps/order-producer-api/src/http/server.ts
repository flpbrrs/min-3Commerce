import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from "fastify-type-provider-zod";

import { criarPedido } from "./routes/criar-pedido";
import { rabbitMQPlugin } from "./plugins/rabbitmq.plugin";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)
app.register(rabbitMQPlugin)

app.register(criarPedido)

app.listen({ port: 3333 }).then(() => {
    console.log("Producer running on port: 3333")
})