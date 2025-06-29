import { Pedido } from "@3c/domain/entities";
import { PedidoRepository } from "@3c/domain/providers";
import { prisma } from "@3c/prisma-db";

export class PedidoPrismaRepository implements PedidoRepository {
    private readonly prisma = prisma

    async save(pedido: Pedido): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            await tx.pedido.create({
                data: {
                    id: pedido.id.value,
                    valorTotal: pedido.valorTotal.value,
                    clienteId: pedido.clienteId.value,
                    itens: {
                        createMany: {
                            data: pedido.itens.map((item) => {
                                return {
                                    id: item.id.value,
                                    produto_id: item.produtoId.value,
                                    quantidade: item.quantidade.value,
                                    valorUnitario: item.valorUnitario.value
                                }
                            })
                        }
                    }
                }
            })
        })
    }
}