import { ClienteRepository, PedidoRepository, ProdutoRepository } from "@3c/domain/providers"
import { CriarPedidoUseCase } from "@3c/domain/services"

type PedidoDTO = {
    clienteId: string,
    itens: {
        itemId: string,
        quantidade: number
    }[]
}

export default class PedidoProcessor {
    private readonly criarPedidosUseCase: CriarPedidoUseCase

    constructor(
        pedidoRepository: PedidoRepository,
        clienteRepository: ClienteRepository,
        produtoRepository: ProdutoRepository
    ) {
        this.criarPedidosUseCase = new CriarPedidoUseCase(
            pedidoRepository,
            clienteRepository,
            produtoRepository
        )
    }

    async process(pedidoDto: PedidoDTO) {
        console.log("\n[CONSUMER] - Recebendo pedido")
        console.log("[CONSUMER] - Salvando pedido...")
        try {
            await this.criarPedidosUseCase.execute(pedidoDto)
            console.log("[CONSUMER] - Pedido registrado.")
        } catch (e: any) {
            console.log(e)
            console.log(`[CONSUMER] - Error: ${e.message}`)
        }
    }
}