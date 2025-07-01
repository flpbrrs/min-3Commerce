import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getClientesDetalhes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/clientes/:clienteId',
        {
            schema: {
                params: z.object({
                    clienteId: z.string().uuid()
                })
            }
        },
        async (request, reply) => {
            const { clienteId } = request.params

            const cliente = await app
                .repositories
                .dashboard
                .getClienteDetalhes(clienteId)

            reply.status(200).send({
                data: cliente
            })
        }
    )
}