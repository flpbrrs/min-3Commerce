import DomainError from "../models/_error/domain.error";
import DomainErrors from "../models/_error/domain.errors";
import CPF from "../models/cpf.vo";
import Entity, { EntityProps } from "../models/entity.basis";
import NomeSimples from "../models/nome-simples.vo";
import Pedido, { PedidoProps } from "./pedido.entity";

export interface ClienteProps extends EntityProps {
    nomeFantasia?: string
    cpf?: string
    pedidos?: PedidoProps[]
}

export default class Cliente extends Entity<Cliente, ClienteProps> {
    readonly nomeFantasia: NomeSimples
    readonly cpf: CPF
    readonly pedidos: Pedido[]

    private constructor(props: ClienteProps) {
        super(props);

        this.nomeFantasia = new NomeSimples(props.nomeFantasia!);
        this.cpf = new CPF(props.cpf!);
        this.pedidos = (props.pedidos || []).map(pedido => Pedido.create(pedido));
    }

    static create(props: ClienteProps): Cliente {
        const errors = this.validate(props);

        if (errors.length > 0)
            throw DomainErrors.groupByField<keyof ClienteProps>(errors);

        return new Cliente(props);
    }

    private static validate(props: ClienteProps): DomainError[] {
        const valueObjectErros: DomainError[] = [];

        if (!NomeSimples.isValid(props.nomeFantasia))
            valueObjectErros.push(
                DomainError.create(
                    'cliente.nome-fantasia-invalido',
                    'O nome fantasia do cliente deve ser um nome válido.'
                )
            );

        if (!CPF.isValid(props.cpf))
            valueObjectErros.push(
                DomainError.create(
                    'cliente.cpf-invalido',
                    'O CPF do cliente deve ser um CPF válido.'
                )
            );

        return valueObjectErros;
    }
}