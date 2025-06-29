import { describe, expect, it } from '@jest/globals'
import Cliente from '../../src/entities/cliente.entity'
import Id from '../../src/models/id.vo';

describe("Testes para a entidade Cliente", () => {
    it("Deve criar um cliente com nome fantasia e CPF válidos", () => {
        const cliente = Cliente.create({
            nomeFantasia: "Loja Exemplo",
            cpf: "12345678909"
        });

        expect(cliente.nomeFantasia.value).toBe("Loja Exemplo");
        expect(cliente.cpf.value).toBe("12345678909");
    });

    it("Deve lançar erro ao criar cliente com nome fantasia inválido", () => {
        expect(() => {
            Cliente.create({
                nomeFantasia: "",
                cpf: "12345678909"
            });
        }).toThrow();
    });

    it("Deve lançar erro ao criar cliente com CPF inválido", () => {
        expect(() => {
            Cliente.create({
                nomeFantasia: "Loja Exemplo",
                cpf: "1234567890"
            });
        }).toThrow()
    });

    it("Deve criar cliente com pedidos válidos", () => {
        const id = Id.generate();
        const pedidoId = Id.generate();
        const cliente = Cliente.create({
            id,
            nomeFantasia: "Loja Exemplo",
            cpf: "12345678909",
            pedidos: [
                {
                    id: pedidoId,
                    itens: [
                        {
                            quantidade: 2,
                            valorUnitario: 50.00,
                            produtoId: Id.generate(),
                            pedidoId,
                        }
                    ],
                    clienteId: id,
                }
            ]
        });

        expect(cliente.pedidos.length).toBe(1);
        expect(cliente.pedidos[0].valorTotal.value).toBe(100.00);
    });
})