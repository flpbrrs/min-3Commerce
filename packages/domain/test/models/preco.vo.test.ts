import { describe, expect, it } from '@jest/globals'
import Preco from '../../src/models/preco.vo'
import DomainError from '../../src/models/_error/domain.error'

describe("Testes para o objeto de valor: Preço", () => {
    it("Deve criar um Preço com valor válido", () => {
        const preco = new Preco(100.50)

        expect(preco.value).toBe(100.50)
    })

    it("Deve formatar o Preço corretamente", () => {
        const preco = new Preco(100.50)

        expect(preco.formatted).toBe('R$ 100,50')
    })

    it("Deve gerar erro ao criar um Preço negativo", () => {
        expect(() => new Preco(-10)).toThrow(DomainError)
    })

    it("Deve comparar dois Preços iguais", () => {
        const preco1 = new Preco(50.00)
        const preco2 = new Preco(50.00)

        expect(preco1.equals(preco2)).toBe(true)
    })

    it("Deve converter um número ou Preço para o formato monetário", () => {
        const preco1 = new Preco(20.00)
        const preco2 = 20.00

        expect(Preco.toFormattedPrice(preco1)).toBe('R$ 20,00')
        expect(Preco.toFormattedPrice(preco2)).toBe('R$ 20,00')
        expect(Preco.toFormattedPrice(-5)).toBe('R$0,00')
    })

    it("Deve validar corretamente Preço com fontes diferentes", () => {
        const preco1 = new Preco(20.00)
        const preco2 = 20.00

        expect(Preco.isValid(preco1)).toBe(true)
        expect(Preco.isValid(preco2)).toBe(true)
        expect(Preco.isValid(-5)).toBe(false)
        expect(Preco.isValid()).toBe(false)
    })
})