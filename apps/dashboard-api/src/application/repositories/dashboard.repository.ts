import { prisma } from "@3c/prisma-db";
import { CPF, Preco } from "@3c/domain/models"

export class DashboardRepository {
    private readonly prisma = prisma

    async getClientsList() {
        const [clientes, totalClientes] = await Promise.all([
            this.prisma.cliente.findMany({
                omit: { dataControle: true },
                include: { _count: true }
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
                dataCriacao: cliente.dataCriacao.toLocaleDateString()
            }))
        }
    }

    async getClienteDetalhes(clienteId: string) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id: clienteId },
            select: {
                _count: true,
                nomeFantasia: true,
                pedidos: {
                    select: {
                        id: true,
                        dataCriacao: true,
                        valorTotal: true,
                        _count: true,
                        itens: {
                            select: {
                                produto: {
                                    select: { nome: true }
                                },
                                quantidade: true,
                                valorUnitario: true
                            }
                        }
                    }
                }
            }
        })

        if (!cliente) return null

        return {
            nomeFantasia: cliente.nomeFantasia,
            totalPedidos: cliente._count.pedidos,
            pedidos: cliente.pedidos.map(p => ({
                id: p.id,
                dataRealizacao:
                    `${p.dataCriacao.toLocaleDateString()} ${p.dataCriacao.toLocaleTimeString()}`,
                valorTotal: new Preco(p.valorTotal).formatted,
                quantidadeItens: p._count.itens,
                itens: p.itens.map(i => ({
                    produto: i.produto.nome,
                    quantidade: i.quantidade,
                    valor: new Preco(i.valorUnitario).formatted
                }))
            }))
        }
    }

    async getResumoPedidos() {
        const [totalVendas, totalItens, totalPedidos, listaPedidos] = await Promise.all([
            this.prisma.pedido.aggregate({
                _sum: { valorTotal: true }
            }),
            prisma.pedidoProduto.aggregate({
                _sum: { quantidade: true }
            }),
            prisma.pedido.count(),
            prisma.pedido.findMany({
                select: {
                    id: true,
                    dataCriacao: true,
                    valorTotal: true,
                    _count: true,
                    cliente: {
                        select: { nomeFantasia: true }
                    }
                },
                orderBy: {
                    dataCriacao: 'desc'
                }
            })
        ]);

        return {
            totalVendas: new Preco(totalVendas._sum.valorTotal ?? 0).formatted,
            totalItensVendidos: totalItens._sum.quantidade ?? 0,
            numeroTotalPedidos: totalPedidos,
            pedidos: listaPedidos.map(pedido => ({
                id: pedido.id,
                dataCriacao: pedido.dataCriacao.toLocaleDateString(),
                valor: new Preco(pedido.valorTotal).formatted,
                quantidadeItens: pedido._count.itens,
                cliente: pedido.cliente.nomeFantasia
            }))
        };
    }
}