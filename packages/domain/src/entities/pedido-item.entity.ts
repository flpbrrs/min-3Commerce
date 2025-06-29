import DomainError from "../models/_error/domain.error";
import DomainErrors from "../models/_error/domain.errors";
import Entity, { EntityProps } from "../models/entity.basis";
import Id from "../models/id.vo";
import Preco from "../models/preco.vo";
import ValorPositivo from "../models/valor-positivo.vo";

export interface PedidoItemProps extends EntityProps {
    quantidade?: number
    valorUnitario?: number
    produtoId?: string,
    pedidoId?: string
}

type PedidoItemField = 'quantidade' | 'valorUnitario' | 'produtoId' | 'pedidoId';

export default class PedidoItem extends Entity<PedidoItem, PedidoItemProps> {
    readonly quantidade: ValorPositivo;
    readonly valorUnitario: Preco;
    readonly produtoId: Id;
    readonly pedidoId: Id;

    private constructor(props: PedidoItemProps) {
        super(props);

        this.quantidade = new ValorPositivo(props.quantidade!);
        this.valorUnitario = new Preco(props.valorUnitario!);
        this.produtoId = new Id(props.produtoId!);
        this.pedidoId = new Id(props.pedidoId!);
    }

    get valorTotal(): number {
        return this.quantidade.value * this.valorUnitario.value;
    }

    get valorTotalFormatado(): string {
        return Preco.toFormattedPrice(this.valorTotal);
    }

    static create(props: PedidoItemProps): PedidoItem {
        const errors = this.validate(props);

        if (errors.length > 0)
            throw DomainErrors.groupByField<PedidoItemField>(errors);

        return new PedidoItem(props);
    }

    private static validate(props: PedidoItemProps): DomainError[] {
        const valueObjectErros: DomainError[] = [];

        if (!ValorPositivo.isValid(props.quantidade))
            valueObjectErros.push(
                DomainError.create(
                    'pedido_item.quantidade-invalida',
                    'A quantidade do item do pedido deve ser um valor positivo.'
                )
            )

        if (!Preco.isValid(props.valorUnitario))
            valueObjectErros.push(
                DomainError.create(
                    'pedido_item.valor_unitario-invalido',
                    'O valor unitário do item do pedido deve ser um número válido.'
                )
            )

        if (!Id.isValid(props.produtoId))
            valueObjectErros.push(
                DomainError.create(
                    'pedido_item.produto_id-invalido',
                    'O ID do produto do item do pedido deve ser um valor válido.'
                )
            )

        if (!Id.isValid(props.pedidoId))
            valueObjectErros.push(
                DomainError.create(
                    'pedido_item.pedido_id-invalido',
                    'O ID do pedido do item deve ser um valor válido.'
                )
            );

        return valueObjectErros;
    }
}