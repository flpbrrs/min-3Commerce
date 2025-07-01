import { api } from "./api-client";

export interface GetClienteDetalhesPedido {
    id: string;
    dataRealizacao: string;
    valorTotal: string;
    quantidadeItens: number;
    itens: GetClienteDetalhesPedidoItem[];
}

export interface GetClienteDetalhesPedidoItem {
    produto: string;
    quantidade: number;
    valor: string;
}

export interface GetClienteDetalhesResponse {
    data: {
        nomeFantasia: string;
        totalPedidos: number;
        pedidos: GetClienteDetalhesPedido[];
    } | null
}

export async function getClienteDetalhes(clienteId: string) {
    const cliente = await api
        .get(`clientes/${clienteId}`)
        .json<GetClienteDetalhesResponse>()

    return cliente;
}