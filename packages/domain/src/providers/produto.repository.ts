import Produto from "../entities/produto.entity";

export interface ProdutoRepository {
    findManyByIds(ids: string[]): Promise<Produto[]>;
}