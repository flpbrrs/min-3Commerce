import { describe, expect, it } from '@jest/globals'
import Id from '../../src/models/id.vo'
import DomainError from '../../src/models/_error/domain.error'

describe("Testes para o objeto de valor: Id", () => {
    it('Deve criar um Id com valor gerado automaticamente', () => {
        const id = new Id()

        expect(id.value).toBeDefined()
        expect(id.value.length).toBe(36)
    })

    it("Deve gerar um id válido", () => {
        const id = Id.generate()

        expect(Id.isValid(id)).toBe(true)
    })

    it("Deve gerar erro ao criar um Id inválido", () => {
        expect(() => new Id('invalid-id')).toThrow(DomainError)
    })

    it("Deve comparar dois Ids iguais", () => {
        const id1 = new Id('123e4567-e89b-12d3-a456-426614174000')
        const id2 = new Id('123e4567-e89b-12d3-a456-426614174000')

        expect(id1.equals(id2)).toBe(true)
        expect(id1.notEquals(id2)).toBe(false)
    })

    it("Deve validar corretamente id com fontes diferentes", () => {
        const id1 = new Id('123e4567-e89b-12d3-a456-426614174000')
        const id2 = '123e4567-e89b-12d3-a456-426614174000'

        expect(Id.isValid(id1)).toBe(true)
        expect(Id.isValid(id2)).toBe(true)
        expect(Id.isValid('invalid-id')).toBe(false)
        expect(Id.isValid()).toBe(false)
    })
})