import Pedido, { PedidoProps } from "../entities/pedido.entity";
import DomainError from "../models/_error/domain.error";
import { UseCase } from "../models/usecase.basis";
import { ClienteRepository } from "../providers/cliente.repository";
import { PedidoRepository } from "../providers/pedido.repository";
import { WithRequired } from "../utils/withRequired.type";

type UCInput = WithRequired<PedidoProps, 'clienteId' | 'itens'>;

export default class CriarPedidoUseCase implements UseCase<UCInput, void> {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly clienteRepository: ClienteRepository
    ) { }

    async execute(input: UCInput): Promise<void> {
        const clienteFromRequest = await this.clienteRepository
            .findById(input.clienteId);

        if (!clienteFromRequest)
            DomainError.launch(
                'pedido.cliente-nao-encontrado',
                'O cliente informado não foi encontrado.'
            );

        const pedido = Pedido.create(input)
        await this.pedidoRepository.save(pedido)
    }
}