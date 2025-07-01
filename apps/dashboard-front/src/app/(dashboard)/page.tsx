import { getResumoPedidos } from "@/http/get-resumo-dashboard";

export default async function PedidosPage() {
  const { data } = await getResumoPedidos()

  return (
    <div>
      <div className="flex items-center justify-center gap-4 my-6">
        <div className="p-4 border rounded-2xl border-zinc-300 shadow-lg min-w-86">
          <p className="text-lg font-bold mb-2">Total de vendas:</p>
          <p className="text-end text-2xl text-zinc-500">{data.totalVendas}</p>
        </div>
        <div className="p-4 border rounded-2xl border-zinc-300 shadow-lg min-w-86">
          <p className="text-lg font-bold mb-2">Total de itens vendidos:</p>
          <p className="text-end text-2xl text-zinc-500">{data.totalItensVendidos} itens vendidos</p>
        </div>
        <div className="p-4 border rounded-2xl border-zinc-300 shadow-lg min-w-86">
          <p className="text-lg font-bold mb-2">Total pedidos realizados:</p>
          <p className="text-end text-2xl text-zinc-500">{data.numeroTotalPedidos} pedidos recebidos</p>
        </div>
      </div>
      <div className="relative overflow-x-auto my-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-zinc-200 uppercase bg-emerald-500">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Identificador
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Data de criação
              </th>
              <th scope="col" className="px-6 py-3">
                Quantidade de produtos
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Valor do pedido
              </th>
            </tr>
          </thead>
          <tbody className="text-lg font-semibold">
            {data.pedidos.map(pedido => (
              <tr className="bg-white" key={pedido.id}>
                  <td className="px-6 py-4">
                    #{pedido.id.slice(0, 5).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.cliente}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.dataCriacao}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.quantidadeItens}
                  </td>
                  <td className="px-6 py-4">
                    {pedido.valor}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
