'use client'

import { useRouter } from "next/navigation"
import {
    TbBuildingStore as IconStore,
    TbClipboardData as IconData
} from "react-icons/tb"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface ClienteProps {
    cliente: {
        documento: string;
        pedidosRealizados: number;
        dataCriacao: string;
        id: string;
        nomeFantasia: string;
    }
}

export default function ClienteListaItem({ cliente }: ClienteProps) {
    const router = useRouter()

    return (
        <div className="
            border border-zinc-300 rounded-2xl
            px-4 py-2 flex gap-4 items-center
        ">
            <div className="bg-emerald-500 p-3 rounded-md">
                <IconStore size="32px" className="text-white"/>
            </div>
            <div className="leading-none flex-1">
                <p className="leading-8 font-semibold text-xl">
                    {cliente.nomeFantasia}
                </p>
                <p className="text-sm text-zinc-500 font-bold">
                    Cliente desde: {cliente.dataCriacao}
                </p>
                <p className="text-sm text-zinc-500 font-bold">
                    Pedidos realizados: {cliente.pedidosRealizados}
                </p>
            </div>
            <Tooltip>
                <TooltipTrigger
                    onClick={() => router.push(`/detalhes/${cliente.id}`)}
                    className="p-2 rounded-xl cursor-pointer hover:bg-gray-600/15"
                >
                    <IconData size={24} className="text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ver detalhes do cliente</p>
                </TooltipContent>
            </Tooltip>  
            
        </div>
    )
}