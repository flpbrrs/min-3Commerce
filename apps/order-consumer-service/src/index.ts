import { consume } from "@3c/rabbit-queue"
import PedidoProcessor from "./worker/processa-pedido.worker"
import { ClientePrismaRepository } from "./repositories/cliente.repository"
import { PedidoPrismaRepository } from "./repositories/pedido.repository"
import { ProdutoPrismaRepository } from "./repositories/produto.repository"

async function bootstrap() {
    console.log("[CONSUMER] - Inicializando processador de pedidos...")
    const processor = new PedidoProcessor(
        new PedidoPrismaRepository(),
        new ClientePrismaRepository(),
        new ProdutoPrismaRepository()
    )

    console.log("[CONSUMER] - Ouvindo fila de pedidos...")
    await consume('pedidos', processor.process.bind(processor))
}

bootstrap()