'use client'

import { useRouter } from "next/navigation"
import { TbChevronLeft as IconLeft} from "react-icons/tb"

export default function ReturnToHomeButton() {
    const router = useRouter()
    
    return (
        <div
            onClick={() => router.push('/')}
            className="mb-8 text-emerald-600 underline flex items-center cursor-pointer"
        >
            <IconLeft />
            <p>Voltar a lista de pedidos</p>
        </div>
    )
}