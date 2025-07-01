import { prisma } from "@3c/prisma-db";
import { CPF, Preco } from "@3c/domain/models"

export class DashboardRepository {
    private readonly prisma = prisma

    async getClientsList() {
        const [clientes, totalClientes] = await Promise.all([
            this.prisma.cliente.findMany({
                omit: {
                    dataControle: true
                },
                include: {
                    _count: true,
                    pedidos: {
                        omit: {
                            clienteId: true,
                            dataControle: true,
                        },
                        include: {
                            itens: {
                                omit: {
                                    pedidoId: true,
                                    produto_id: true,
                                },
                                include: {
                                    produto: {
                                        select: {
                                            nome: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }),
            this.prisma.cliente.count()
        ]);

        return {
            totalClientes,
            clientes: clientes.map(cliente => ({
                ...cliente,
                _count: undefined,
                documento: new CPF(cliente.documento).formatted,
                pedidosRealizados: cliente._count.pedidos,
                dataCriacao: cliente.dataCriacao.toLocaleDateString(),
                pedidos: cliente.pedidos.map(pedido => ({
                    ...pedido,
                    valorTotal: new Preco(pedido.valorTotal).formatted,
                    dataCriacao: pedido.dataCriacao.toLocaleDateString(),
                    itens: pedido.itens.map(item => ({
                        ...item,
                        valorUnitario: new Preco(item.valorUnitario).formatted,
                        produto: item.produto.nome
                    }))
                }))
            }))
        }
    }
}