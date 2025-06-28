import DomainError from "./_error/domain.error";

export default class CPF {
    readonly value: string;

    constructor(value: string) {
        if (!CPF.isValid(value))
            DomainError.launch(
                'cpf.valor-invalido',
                'Deve conter 11 dígitos sem formatação (apenas números).'
            )

        this.value = value;
    }

    get formatted(): string {
        return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    static isValid(cpf: string): boolean {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
            return false;
        }
        return true;
    }
}