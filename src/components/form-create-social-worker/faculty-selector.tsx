"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Faculty {
  id: number
  name: string
  creation_date: Date
}

interface FacultySelectorProps {
  faculties: Faculty[]
  selectedFaculties: number[]
  onSelectionChange: (facultyIds: number[]) => void
}

export function FacultySelector({ faculties, selectedFaculties, onSelectionChange }: FacultySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaculties = faculties.filter((faculty) => faculty.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFacultyToggle = (facultyId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedFaculties, facultyId])
    } else {
      onSelectionChange(selectedFaculties.filter((id) => id !== facultyId))
    }
  }

  const selectedCount = selectedFaculties.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Facultades Asignadas</h3>
          <p className="text-sm text-muted-foreground">
            Seleccione las facultades que serán asignadas al trabajador social
          </p>
        </div>
        {selectedCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {selectedCount} seleccionada{selectedCount !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar facultades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de facultades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
        {filteredFaculties.map((faculty) => (
          <Card
            key={faculty.id}
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedFaculties.includes(faculty.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleFacultyToggle(faculty.id, !selectedFaculties.includes(faculty.id))}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedFaculties.includes(faculty.id)}
                  onChange={() => {}} // Manejado por el onClick del Card
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium leading-tight">{faculty.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Creada el {format(faculty.creation_date, "dd 'de' MMMM 'de' yyyy", { locale: es })}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFaculties.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No se encontraron facultades que coincidan con la búsqueda</p>
        </div>
      )}
    </div>
  )
}
