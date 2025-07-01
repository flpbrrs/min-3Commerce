import { Cliente } from "@3c/domain/entities";
import { ClienteRepository } from "@3c/domain/providers";
import { prisma } from "@3c/prisma-db";

export class ClientePrismaRepository implements ClienteRepository {
    private readonly prisma = prisma

    async save(cliente: Cliente): Promise<void> {
        throw new Error("not implemented")
    }

    async findById(id: string): Promise<Cliente | null> {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id }
        })

        if (!cliente) return null

        return Cliente.create({
            id: cliente.id,
            cpf: cliente.documento,
            nomeFantasia: cliente.nomeFantasia,
            pedidos: []
        })
    }
}