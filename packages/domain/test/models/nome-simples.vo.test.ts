import { describe, expect, it } from '@jest/globals'
import NomeSimples from '../../src/models/nome-simples.vo'
import DomainError from '../../src/models/_error/domain.error'

describe("Testes para o objeto de valor: Nome Simples", () => {
    it("Deve criar um Nome Simples com valor válido", () => {
        const nome = new NomeSimples("João da Silva")
        expect(nome.value).toBe("João da Silva")
    })

    it("Deve gerar erro ao criar um Nome Simples vazio", () => {
        expect(() => new NomeSimples("")).toThrow(DomainError)
    })

    it("Deve comparar dois Nomes Simples iguais", () => {
        const nome1 = new NomeSimples("Maria")
        const nome2 = new NomeSimples("Maria")

        expect(nome1.equals(nome2)).toBe(true)
    })

    it("Deve validar corretamente Nome Simples com fontes diferentes", () => {
        const nome1 = new NomeSimples("Ana")
        const nome2 = "Ana"

        expect(NomeSimples.isValid(nome1)).toBe(true)
        expect(NomeSimples.isValid(nome2)).toBe(true)
        expect(NomeSimples.isValid("")).toBe(false)
        expect(NomeSimples.isValid()).toBe(false)
    })
})