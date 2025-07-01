import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getCLientes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/clientes',
        async (_, reply) => {
            const clientes = await app.repositories.dashboard.getClientsList()

            reply.status(200).send({
                data: clientes
            });
        }
    )
}