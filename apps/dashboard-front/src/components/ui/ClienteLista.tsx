import { getClienteLista } from "@/http/get-cliente-lista"
import ClienteListaItem from './ClienteListaItem'

export default async function ClienteLista() {
    const { data } = await getClienteLista()
    
    return (
        <div className="card h-full select-none">
            <h2 className="title">
                Lista de clientes
            </h2>
            <div className="font-semibold text-zinc-500">
                Total de clientes: {data.totalClientes}
            </div>
            <div className="border-t border-zinc-300 my-2"/>
            <div className="flex flex-col gap-4">
                {data.clientes.map(cliente => (
                    <ClienteListaItem key={cliente.id} cliente={cliente} />
                ))}
            </div>
        </div>
    )
}