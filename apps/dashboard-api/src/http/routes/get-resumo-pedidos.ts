import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getResumoPedidos(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/dashboard',
        async (request, reply) => {
            const pedidos = await app.repositories.dashboard.getResumoPedidos()

            reply.status(200).send({
                data: pedidos
            })
        }
    )
}