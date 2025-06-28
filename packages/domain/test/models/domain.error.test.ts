import { describe, expect, it } from '@jest/globals'
import DomainError from '../../src/models/_error/domain.error'

describe("Testes para o objeto de erro: DomainError", () => {
    it('Deve criar um DomainError com código, valor e extras', () => {
        const error = DomainError.create(
            'domain.test-invalid',
            'extra detail'
        )

        expect(error.code).toBe('domain.test-invalid')
        expect(error.message).toBe('extra detail')
    })

    it("Deve lançar um DomainError com código, valor e extras", () => {
        expect(() => {
            DomainError.launch(
                'domain.test',
                'test value'
            )
        }).toThrow(DomainError)

        try {
            DomainError.launch(
                'domain.test',
                'test value'
            )
        } catch (error) {
            expect(error.code).toBe('domain.test')
            expect(error.message).toBe('test value')
        }
    })
})