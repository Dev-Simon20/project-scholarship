import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Users, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { ScholarshipProcess } from "@/types/scholarship-process"


interface ScholarshipProcessCardProps {
  process: ScholarshipProcess
}

export function ScholarshipProcessCard({ process }: ScholarshipProcessCardProps) {
  // Determinar el estado del proceso
  const now = new Date()
  const openDate = new Date(process.open_date)
  const closeDate = new Date(process.close_date)

  const isOpen = now >= openDate && now <= closeDate
  const isClosed = now > closeDate
  const isUpcoming = now < openDate

  // Formatear fechas
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  // Calcular días restantes o pasados
  const getDaysMessage = () => {
    if (isUpcoming) {
      const daysToStart = Math.ceil((openDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return `Comienza en ${daysToStart} día${daysToStart !== 1 ? "s" : ""}`
    }

    if (isOpen) {
      const daysToEnd = Math.ceil((closeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return `${daysToEnd} día${daysToEnd !== 1 ? "s" : ""} restante${daysToEnd !== 1 ? "s" : ""}`
    }

    const daysSinceEnd = Math.ceil((now.getTime() - closeDate.getTime()) / (1000 * 60 * 60 * 24))
    return `Cerrado hace ${daysSinceEnd} día${daysSinceEnd !== 1 ? "s" : ""}`
  }

  // Determinar el color del badge según el estado
  const getBadgeVariant = () => {
    if (isOpen) return "success"
    if (isClosed) return "destructive"
    return "default"
  }

  const getStatusText = () => {
    if (isOpen) return "Abierto"
    if (isClosed) return "Cerrado"
    return "Próximamente"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <Badge variant={getBadgeVariant() as any} className="mb-2">
            {getStatusText()}
          </Badge>
          <div className="text-sm text-muted-foreground">ID: {process.id}</div>
        </div>
        <h3 className="text-xl font-bold line-clamp-2">{process.title}</h3>
        <p className="text-muted-foreground line-clamp-2">{process.sub_title}</p>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(openDate)} - {formatDate(closeDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{getDaysMessage()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>
              {process.requirements} requisito{process.requirements!== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {process.student_processes || 0} postulante
              {(process.student_processes || 0) !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t flex justify-between">
        <Link href={`/scholarship-process/${process.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            Ver
          </Button>
        </Link>

        <div className="flex gap-2">
          <Link href={`/scholarship-process/${process.id}/edit`}>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}