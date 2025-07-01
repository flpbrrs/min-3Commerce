import { api } from "./api-client";

export interface GetClienteListaResponse {
    data: {
        totalClientes: number;
        clientes: {
            documento: string;
            pedidosRealizados: number;
            dataCriacao: string;
            id: string;
            nomeFantasia: string;
        }[];
    }
}

export async function getClienteLista() {
    const clientes = await api.get('clientes').json<GetClienteListaResponse>()
    return clientes;
}