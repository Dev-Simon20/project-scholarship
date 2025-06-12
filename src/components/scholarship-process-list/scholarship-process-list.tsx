"use client"

import { useState } from "react"
import { Pagination } from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"

import { FileQuestion } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { ScholarshipProcess } from "@/types/scholarship-process"
import { ScholarshipProcessCard } from "../scholarship-process-card/scholarship-process-card"

interface ScholarshipProcessListProps {
  initialProcesses: ScholarshipProcess[]
}

export function ScholarshipProcessList({ initialProcesses }: ScholarshipProcessListProps) {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Aplicar filtros desde URL
  const status = searchParams.get("status")
  const search = searchParams.get("search")?.toLowerCase()

  // Filtrar procesos
  const filteredProcesses = initialProcesses.filter((process) => {
    // Filtrar por estado
    if (status && status !== "all") {
      const now = new Date()
      const isOpen = now >= new Date(process.open_date) && now <= new Date(process.close_date)
      const isClosed = now > new Date(process.close_date)
      const isUpcoming = now < new Date(process.open_date)

      if (status === "open" && !isOpen) return false
      if (status === "closed" && !isClosed) return false
      if (status === "upcoming" && !isUpcoming) return false
    }

    // Filtrar por búsqueda
    if (search) {
      const matchesSearch =
        process.title.toLowerCase().includes(search) || process.sub_title.toLowerCase().includes(search)
      if (!matchesSearch) return false
    }

    return true
  })

  // Calcular paginación
  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProcesses = filteredProcesses.slice(startIndex, startIndex + itemsPerPage)

  if (filteredProcesses.length === 0) {
    return     <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-gray-50">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">No se encontraron procesos</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        No hay procesos de beca que coincidan con los criterios de búsqueda o aún no se han creado procesos.
      </p>
      <Link href="/scholarship-process/create">
        <Button>Crear Nuevo Proceso</Button>
      </Link>
    </div>
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProcesses.map((process) => (
          <ScholarshipProcessCard key={process.id} process={process} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
        </div>
      )}
    </div>
  )
}
