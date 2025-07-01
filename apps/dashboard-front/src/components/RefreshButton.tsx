'use client'

import { useRouter } from 'next/navigation'

export function RefreshDashboardButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.refresh()}
      className="primary-btn"
    >
      Atualizar Dashboard
    </button>
  )
}