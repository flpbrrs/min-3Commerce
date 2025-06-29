import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

async function seed() {
    await prisma.pedidoProduto.deleteMany()
    await prisma.pedido.deleteMany()
    await prisma.produto.deleteMany()
    await prisma.cliente.deleteMany()

    await prisma.produto.createMany({
        data: [
            { nome: "Café Expresso", valor: 3.5 },
            { nome: "Café Capsula", valor: 6.0 },
            { nome: "Máquina Café", valor: 450.5 },
        ]
    })

    await prisma.cliente.createMany({
        data: [
            { nomeFantasia: "Loja do seu Pedro LTDA", documento: "12345678901" },
            { nomeFantasia: "Mercadinho Seu Vicente ME", documento: "987654321" },
            { nomeFantasia: "Supermercado da Seu Paulo", documento: "1122334455" },
        ]
    })
}

seed()
    .then(() => console.log("Database seeded successfully"))
    .catch(e => {
        console.error(e)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })