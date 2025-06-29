import { describe, expect, it } from '@jest/globals'
import CPF from '../../src/models/cpf.vo'
import DomainError from '../../src/models/_error/domain.error';

describe("Testes para o objeto de valor: CPF", () => {
    it("Deve criar um CPF válido", () => {
        const cpf = new CPF("12345678909");
        expect(cpf.value).toBe("12345678909");
        expect(cpf.formatted).toBe("123.456.789-09");
    });

    it("Deve lançar erro para CPF inválido", () => {
        expect(() => new CPF("1234567890")).toThrow(DomainError);
        expect(() => new CPF("123456789012")).toThrow(DomainError);
        expect(() => new CPF("11111111111")).toThrow(DomainError);
        expect(() => new CPF("")).toThrow(DomainError);
    });

    it("Deve validar corretamente CPFs", () => {
        expect(CPF.isValid("12345678909")).toBe(true);
        expect(CPF.isValid("11111111111")).toBe(false);
        expect(CPF.isValid("1234567890")).toBe(false);
    });
}) 