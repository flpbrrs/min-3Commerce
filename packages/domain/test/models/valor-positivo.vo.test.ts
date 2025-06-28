import { describe, expect, it } from '@jest/globals'
import ValorPositivo from '../../src/models/valor-positivo.vo';
import DomainError from '../../src/models/_error/domain.error';

describe("Testes para o objeto de valor: Valor Positivo", () => {
    it("Deve criar um valor positivo com sucesso", () => {
        const valor = new ValorPositivo(10);
        expect(valor.value).toBe(10);
    });

    it("Deve lançar erro ao criar valor negativo ou zero", () => {
        expect(() => new ValorPositivo(-5)).toThrow(DomainError);
        expect(() => new ValorPositivo(0)).toThrow(DomainError);
    });

    it("Deve comparar dois valores positivos corretamente", () => {
        const valor1 = new ValorPositivo(15);
        const valor2 = new ValorPositivo(15);
        const valor3 = new ValorPositivo(20);

        expect(valor1.equals(valor2)).toBe(true);
        expect(valor1.equals(valor3)).toBe(false);
    });

    it("Deve validar se um valor é positivo", () => {
        expect(ValorPositivo.isValid(new ValorPositivo(5))).toBe(true);
        expect(ValorPositivo.isValid(10)).toBe(true);
        expect(ValorPositivo.isValid(-10)).toBe(false);
        expect(ValorPositivo.isValid(0)).toBe(false);
        expect(ValorPositivo.isValid(undefined)).toBe(false);
    });
}) 