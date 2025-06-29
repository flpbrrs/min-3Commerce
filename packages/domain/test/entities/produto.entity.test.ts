import { describe, expect, it } from '@jest/globals'
import Produto from '../../src/entities/produto.entity'

describe("Testes para a entidade Produto", () => {
    it("Deve criar um produto válido", () => {
        const produto = Produto.create({
            nome: "Produto Teste",
            valor: 100.00
        });

        expect(produto.nome.value).toBe("Produto Teste");
        expect(produto.valor.value).toBe(100.00);
    });

    it("Deve lançar erro para nome inválido", () => {
        expect(() => Produto.create({
            nome: "",
            valor: 100.00
        })).toThrow();
    });

    it("Deve lançar erro para valor inválido", () => {
        expect(() => Produto.create({
            nome: "Produto Teste",
            valor: -50.00
        })).toThrow();
    });
});