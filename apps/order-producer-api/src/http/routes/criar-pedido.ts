import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function criarPedido(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/pedido',
        {
            schema: {
                body: z.object({
                    clienteId: z.string().uuid(),
                    itens: z.array(
                        z.object({
                            itemId: z.string().uuid(),
                            quantidade: z.number().int().positive(),
                            valorUnitario: z.number().positive(),
                        })
                    ).min(1)
                })
            }
        },
        async (request, reply) => {
            await app.queuePublish('pedidos', request.body)

            reply.status(202).send({ status: "pedido enviado à fila" });
        }
    )
}