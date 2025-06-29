import { describe, expect, it } from '@jest/globals'
import Pedido from '../../src/entities/pedido.entity'
import Id from '../../src/models/id.vo';
import PedidoItem from '../../src/entities/pedido-item.entity';

describe("Testes para a entidade Pedido", () => {
    it("Deve criar um Pedido válido", () => {
        const pedido = Pedido.create({
            valorTotal: 150.00,
            itens: [
                {
                    quantidade: 2,
                    valorUnitario: 50.00,
                    produtoId: Id.generate(),
                    pedidoId: Id.generate()
                }
            ],
            clienteId: Id.generate()
        });

        expect(pedido.valorTotal.value).toBe(150.00);
        expect(pedido.itens.length).toBe(1);
        expect(pedido.itens[0].quantidade.value).toBe(2);
        expect(pedido.itens[0].valorUnitario.value).toBe(50.00);
        expect(pedido.clienteId.value).toBeDefined();
    });

    it("Deve lançar erro para valor total inválido", () => {
        expect(() => Pedido.create({
            valorTotal: -100.00,
            itens: [],
            clienteId: "cliente-789"
        })).toThrow();
    });

    it("Deve lançar erro para itens inválidos", () => {
        expect(() => Pedido.create({
            valorTotal: 150.00,
            itens: [],
            clienteId: "cliente-789"
        })).toThrow();
    });

    it("Deve lançar erro para clienteId inválido", () => {
        expect(() => Pedido.create({
            valorTotal: 150.00,
            itens: [
                {
                    quantidade: 2,
                    valorUnitario: 50.00,
                    produtoId: "produto-123",
                    pedidoId: "pedido-456"
                }
            ],
            clienteId: ""
        })).toThrow();
    });

    it("Deve calcular o valor total do pedido via itens", () => {
        const itens = [
            PedidoItem.create({
                quantidade: 2,
                valorUnitario: 50.00,
                produtoId: Id.generate(),
                pedidoId: Id.generate()
            }),
            PedidoItem.create({
                quantidade: 1,
                valorUnitario: 100.00,
                produtoId: Id.generate(),
                pedidoId: Id.generate()
            })
        ];

        const valorTotal = Pedido.calcularValorTotalPedidoViaItens(itens);
        expect(valorTotal).toBe(200.00);
    });

    it("Deve lançar erro ao calcular valor total com itens inválidos", () => {
        expect(() => Pedido.calcularValorTotalPedidoViaItens([])).toThrow();
    });
})