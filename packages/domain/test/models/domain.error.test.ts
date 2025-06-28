import { describe, expect, it } from '@jest/globals'
import DomainError from '../../src/models/_error/domain.error'

describe("Testes para o objeto de erro: DomainError", () => {
    it('Deve criar um DomainError com código, valor e extras', () => {
        const error = new DomainError({
            code: 'domain.test',
            value: 'test value',
            extras: { detail: 'extra detail' }
        })

        expect(error.code).toBe('domain.test')
        expect(error.value).toBe('test value')
        expect(error.extras).toEqual({ detail: 'extra detail' })
    })

    it('Deve criar um DomainError com código padrão', () => {
        const error = DomainError.create()

        expect(error.code).toBe('domain.generic')
    })

    it("Deve lançar um DomainError com código, valor e extras", () => {
        expect(() => {
            DomainError.throwDomainError(
                'domain.test',
                'test value',
                { detail: 'extra detail' }
            )
        }).toThrow(DomainError)

        try {
            DomainError.throwDomainError(
                'domain.test',
                'test value',
                { detail: 'extra detail' }
            )
        } catch (error) {
            expect(error.code).toBe('domain.test')
            expect(error.value).toBe('test value')
            expect(error.extras).toEqual({ detail: 'extra detail' })
        }
    })
})