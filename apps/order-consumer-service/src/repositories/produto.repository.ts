import { Produto } from "@3c/domain/entities";
import { ProdutoRepository } from "@3c/domain/providers";
import { prisma } from "@3c/prisma-db";

export class ProdutoPrismaRepository implements ProdutoRepository {
    private readonly prisma = prisma

    async findManyByIds(ids: string[]): Promise<Produto[]> {
        const produtos = await this.prisma.produto.findMany({
            where: { id: { in: ids } },
        });

        return produtos.map(produto =>
            Produto.create({
                id: produto.id,
                nome: produto.nome,
                valor: produto.valor,
            })
        );
    }
}