import Pedido from "../entities/pedido.entity";

export interface PedidoRepository {
    save(pedido: Pedido): Promise<void>
}