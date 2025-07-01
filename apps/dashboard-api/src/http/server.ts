import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from "fastify-type-provider-zod";
import { repositoryPlugin } from "./plugins/repositories.plugin";

import { getCLientes } from "./routes/get-clientes";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true
})
app.register(repositoryPlugin)

app.register(getCLientes)

app.listen({ port: 4000 }).then(() => {
    console.log("Dashboard-api running on port: 4000")
})