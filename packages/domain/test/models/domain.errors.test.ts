import { describe, expect, it } from '@jest/globals'
import DomainErrors from '../../src/models/_error/domain.errors'
import DomainError from '../../src/models/_error/domain.error';

export type ProdutoFields = 'nome' | 'valor';

describe("Testes para o objeto de erro: DomainErrors", () => {
    it('Deve agrupar erros por campo', () => {
        const errors = [
            DomainError.create('produto.nome-invalido', 'Nome do produto inválido'),
            DomainError.create('produto.valor-invalido', 'Valor do produto obrigatório'),
        ]

        const grouped = DomainErrors.groupByField<ProdutoFields>(errors);

        expect(grouped).toEqual({
            nome: [
                {
                    code: 'produto.nome-invalido',
                    message: 'Nome do produto inválido'
                }
            ],
            valor: [
                {
                    code: 'produto.valor-invalido',
                    message: 'Valor do produto obrigatório'
                }
            ]
        });
    });
});