import DomainError from "../models/_error/domain.error";
import DomainErrors from "../models/_error/domain.errors";
import Entity, { EntityProps } from "../models/entity.basis";
import NomeSimples from "../models/nome-simples.vo";
import Preco from "../models/preco.vo";

export interface ProdutoProps extends EntityProps {
    nome?: string;
    valor?: number;
}

type ProdutoField = 'nome' | 'valor';

export default class Produto extends Entity<Produto, ProdutoProps> {
    readonly nome: NomeSimples
    readonly valor: Preco

    private constructor(props: ProdutoProps) {
        super(props)
        this.nome = new NomeSimples(props.nome!);
        this.valor = new Preco(props.valor!);
    }

    static create(props: ProdutoProps): Produto {
        const errors = this.validate(props);

        if (errors.length > 0)
            throw DomainErrors.groupByField<ProdutoField>(errors)

        return new Produto(props);
    }

    private static validate(props: ProdutoProps): DomainError[] {
        const valueObjectErros: DomainError[] = [];

        if (!Preco.isValid(props.valor))
            valueObjectErros.push(
                DomainError.create(
                    'produto.valor-invalido',
                    'Valor do produto deve ser um número válido.'
                )
            )

        if (!NomeSimples.isValid(props.nome))
            valueObjectErros.push(
                DomainError.create(
                    'produto.nome-invalido',
                    'Nome do produto deve ser um nome válido.'
                )
            )

        return valueObjectErros;
    }
}