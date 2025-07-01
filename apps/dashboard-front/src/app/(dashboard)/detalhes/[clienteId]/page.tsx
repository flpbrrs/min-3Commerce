import ReturnToHomeButton from "@/components/ReturnToHome";
import PedidoClienteTable from "@/components/ui/PedidoClienteTable";
import { getClienteDetalhes } from "@/http/get-cliente-detalhe";

interface DetalhesPageProps {
  params: { clienteId: string };
}

export default async function DetalhesPage({params: { clienteId }}: DetalhesPageProps) {
  const { data } = await getClienteDetalhes(clienteId);

  return (
    <div>
      <ReturnToHomeButton/>
      <p className="title">
        Detalhes do cliente: {data?.nomeFantasia}
      </p>
      <div className="border-t border-zinc-300 my-2"/>
      <div className="mb-4">
        <p className="font-semibold text-zinc-600">Nº de pedidos realizados: {data?.totalPedidos}</p>
      </div>
      {data && data.totalPedidos > 0 ? (
        <PedidoClienteTable pedidos={data.pedidos} />
      ): (
        <div className="
          p-4 text-center text-lg text-zinc-600
          border border-dashed border-zinc-300
          rounded-2xl my-2
        ">
          Nenhum pedido realizado até o momento...
        </div>
      )}
    </div>
  );
}
