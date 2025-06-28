import DomainError from "./_error/domain.error";

export default class Preco {
    readonly value: number;

    constructor(value: number) {
        if (value < 0)
            DomainError.launch(
                'preco.valor-negativo',
                'O preço não pode ter um valor negativo.'
            )

        this.value = value;
    }

    get formatted(): string {
        return this.value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    equals(preco: Preco): boolean {
        return this.value === preco.value;
    }

    static isValid(preco?: Preco | number): boolean {
        if (preco === undefined || preco === null) return false;
        return preco instanceof Preco ? true : typeof preco === 'number' && preco >= 0;
    }
}