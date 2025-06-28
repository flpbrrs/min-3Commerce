import DomainError from "./_error/domain.error";

export default class ValorPositivo {
    readonly value: number;

    constructor(value: number) {
        if (value <= 0)
            DomainError.launch(
                'valor-positivo.value-negative',
                value,
                { message: 'Valor deve ser positivo e maior que zero.' }
            )

        this.value = value;
    }

    equals(valor: ValorPositivo): boolean {
        return this.value === valor.value;
    }

    static isValid(valor?: ValorPositivo | number): boolean {
        if (valor === undefined || valor === null) return false;
        return valor instanceof ValorPositivo ? true : typeof valor === 'number' && valor > 0;
    }
}