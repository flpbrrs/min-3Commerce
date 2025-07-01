'use client'

import { GetClienteDetalhesPedido } from "@/http/get-cliente-detalhe";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface TabelaProps {
    pedidos: GetClienteDetalhesPedido[]
}

export default function PedidoClienteTable({ pedidos }: TabelaProps) {
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-zinc-200 uppercase bg-emerald-500">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Identificador
              </th>
              <th scope="col" className="px-6 py-3">
                Data de realização
              </th>
              <th scope="col" className="px-6 py-3">
                Quantidade produtos
              </th>
              <th scope="col" className="px-6 py-3">
                Valor total
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg"/>
            </tr>
          </thead>
          <tbody className="text-lg font-semibold">
            {pedidos.map(pedido => (
              <tr className="bg-white" key={pedido.id}>
                  <td className="px-6 py-4">
                    #{pedido.id.slice(0, 5).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.dataRealizacao}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.quantidadeItens}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.valorTotal}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Dialog>
                        <DialogTrigger className="text-emerald-600 underline cursor-pointer">
                            Ver itens
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Items do pedido #{pedido.id.slice(0, 5)}
                            </DialogTitle>
                            <DialogDescription className="pt-4">
                                {pedido.itens.map(item => (
                                    <div
                                    key={`${pedido.id}-${item.produto}`}
                                    className="py-2 px-4 border border-zinc-400 mb-2 rounded-2xl"
                                    >
                                        <span className="text-xl font-bold block">{item.produto}</span>
                                        <span className="text-lg">Unidades: {item.quantidade} | Preço na compra: {item.valor}</span>
                                    </div>
                                ))}
                                <p className="text-xl font-bold mt-4 text-end">Valor total: {pedido.valorTotal}</p>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}