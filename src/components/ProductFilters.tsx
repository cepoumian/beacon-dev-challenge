"use client"

import { useRouter, useSearchParams } from "next/navigation"

const CATEGORIES = [
  { label: "Todos", value: "" },
  { label: "Medicamentos", value: "medicamentos" },
  { label: "Suplementos", value: "suplementos" },
  { label: "Cuidado Personal", value: "cuidado-personal" },
  { label: "Dispositivos Médicos", value: "dispositivos-medicos" },
]

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") ?? ""
  const currentSearch = searchParams.get("search") ?? ""

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Buscar productos..."
        defaultValue={currentSearch}
        onChange={(e) => updateParams("search", e.target.value)}
        className="rounded-lg border px-4 py-2 w-full max-w-md"
      />
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateParams("category", cat.value)}
            className={`rounded-full px-4 py-1 text-sm border cursor-pointer ${
              currentCategory === cat.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}