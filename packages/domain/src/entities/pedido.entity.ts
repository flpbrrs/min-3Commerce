import DomainError from "../models/_error/domain.error";
import DomainErrors from "../models/_error/domain.errors";
import Entity, { EntityProps } from "../models/entity.basis";
import Id from "../models/id.vo";
import Preco from "../models/preco.vo";
import PedidoItem, { PedidoItemProps } from "./pedido-item.entity";

export interface PedidoProps extends EntityProps {
    itens?: PedidoItemProps[]
    clienteId?: string
}

type PedidoField = 'itens' | 'clienteId';

export default class Pedido extends Entity<Pedido, PedidoProps> {
    readonly clienteId: Id;
    readonly itens: PedidoItem[];

    private constructor(props: PedidoProps) {
        super(props);

        this.itens = (props.itens!).map(item => PedidoItem.create(item));
        this.clienteId = new Id(props.clienteId!);
    }

    get valorTotal(): Preco {
        return new Preco(this.itens.reduce((total, item) => total + item.valorTotal, 0));
    }

    static create(props: PedidoProps): Pedido {
        const errors = this.validate(props);

        if (errors.length > 0)
            throw DomainErrors.groupByField<PedidoField>(errors);

        return new Pedido(props);
    }

    static calcularValorTotalPedidoViaItens(itens: PedidoItem[]): number {
        if (!itens || !Array.isArray(itens) || itens.length === 0)
            throw DomainError.create(
                'pedido.itens-invalido',
                'O pedido deve conter pelo menos um item.'
            );

        return itens.reduce((total, item) => total + item.valorTotal, 0);
    }

    private static validate(props: PedidoProps): DomainError[] {
        const valueObjectErros: DomainError[] = [];

        if (!props.itens || !Array.isArray(props.itens) || props.itens.length === 0)
            valueObjectErros.push(
                DomainError.create(
                    'pedido.itens-invalido',
                    'O pedido deve conter pelo menos um item.'
                )
            )

        if (!Id.isValid(props.clienteId))
            valueObjectErros.push(
                DomainError.create(
                    'pedido.cliente-id-invalido',
                    'O ID do cliente do pedido deve ser um valor válido.'
                )
            );

        return valueObjectErros;
    }
}