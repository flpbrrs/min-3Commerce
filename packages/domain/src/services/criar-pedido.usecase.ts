import Pedido from "../entities/pedido.entity";
import DomainError from "../models/_error/domain.error";
import { UseCase } from "../models/usecase.basis";
import { ProdutoRepository } from "../providers/produto.repository";
import { ClienteRepository } from "../providers/cliente.repository";
import { PedidoRepository } from "../providers/pedido.repository";
import Id from "../models/id.vo";

type UCInput = {
    clienteId: string,
    itens: {
        itemId: string,
        quantidade: number
    }[]
}

export default class CriarPedidoUseCase implements UseCase<UCInput, void> {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly clienteRepository: ClienteRepository,
        private readonly produtoRepository: ProdutoRepository
    ) { }

    async execute(input: UCInput): Promise<void> {
        const clienteFromRequest = await this.clienteRepository
            .findById(input.clienteId);

        if (!clienteFromRequest)
            DomainError.launch(
                'pedido.cliente-nao_encontrado',
                'O cliente informado não foi encontrado.'
            );

        const itensId = input.itens.map(item => item.itemId!)

        const produtosPedido = await this.produtoRepository
            .findManyByIds(itensId)

        if (produtosPedido.length != itensId.length)
            DomainError.launch(
                'pedido.produto-nao_encontrado',
                'Um dos produtos do pedido não é válido'
            )

        const produtoPrecoMap = new Map(produtosPedido.map(
            p => [p.id.value, p.valor.value])
        );

        const pedidoId = Id.generate()

        const pedido = Pedido.create({
            id: pedidoId,
            clienteId: input.clienteId,
            itens: input.itens.map(item => ({
                quantidade: item.quantidade,
                valorUnitario: produtoPrecoMap.get(item.itemId),
                pedidoId,
                produtoId: item.itemId
            }))
        })

        await this.pedidoRepository.save(pedido)
    }
}