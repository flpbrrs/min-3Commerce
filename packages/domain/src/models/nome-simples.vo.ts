import DomainError from "./_error/domain.error";

export default class NomeSimples {
    readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0)
            DomainError.launch(
                'nome-simples.value-empty',
                value,
                { message: 'Nome não pode ser vazio.' }
            )

        this.value = value.trim();
    }

    equals(other: NomeSimples): boolean {
        return this.value === other.value;
    }

    static isValid(nome?: NomeSimples | string): boolean {
        if (nome === undefined || nome === null) return false;
        return nome instanceof NomeSimples ? true : typeof nome === 'string' && nome.trim().length > 0;
    }
}