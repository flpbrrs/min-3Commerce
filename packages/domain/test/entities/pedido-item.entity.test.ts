import { describe, expect, it } from '@jest/globals'
import PedidoItem from '../../src/entities/pedido-item.entity'
import Id from '../../src/models/id.vo';

describe("Testes para a entidade PedidoItem", () => {
    it("Deve criar um PedidoItem válido", () => {
        const item = PedidoItem.create({
            quantidade: 2,
            valorUnitario: 50.00,
            produtoId: Id.generate(),
            pedidoId: Id.generate()
        });

        expect(item.quantidade.value).toBe(2);
        expect(item.valorUnitario.value).toBe(50.00);
        expect(item.valorTotalFormatado).toBe("R$\u00A0100,00");
        expect(item.produtoId.value).toBeDefined();
        expect(item.pedidoId.value).toBeDefined();
        expect(item.valorTotal).toBe(100.00);
    });

    it("Deve lançar erro para quantidade inválida", () => {
        expect(() => PedidoItem.create({
            quantidade: -1,
            valorUnitario: 50.00,
            produtoId: "produto-123",
            pedidoId: "pedido-456"
        })).toThrow();
    });

    it("Deve lançar erro para valor unitário inválido", () => {
        expect(() => PedidoItem.create({
            quantidade: 2,
            valorUnitario: -10.00,
            produtoId: "produto-123",
            pedidoId: "pedido-456"
        })).toThrow();
    });
})