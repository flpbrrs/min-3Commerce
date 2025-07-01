import { api } from "./api-client";

export interface GetResumoPedidosResponse {
    data: {
        totalVendas: string;
        totalItensVendidos: number;
        numeroTotalPedidos: number;
        pedidos: {
            id: string;
            dataCriacao: string;
            valor: string;
            quantidadeItens: number;
            cliente: string;
        }[];
    }
}

export async function getResumoPedidos() {
    const resumo = await api.get('dashboard').json<GetResumoPedidosResponse>()
    return resumo;
}