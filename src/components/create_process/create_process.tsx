"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Calendar, Save } from "lucide-react"
// import { createScholarshipProcess } from "@/app/actions/scholarship-actions"
import { RequirementForm } from "./requirement_form"
import { toast } from "sonner"
import { DocumenType } from "@prisma/client"

export interface RequirementData {
  id: string
  title: string
  sub_title: string
  step_number: number
  max_size_mb: string
  url_file_example?: string
  document_type: "image" | "video" | "document"
  allowed_file_types: string[]
}

export function CreateScholarshipProcessForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Scholarship Process fields
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [comment, setComment] = useState("")
  const [stepsCount, setStepsCount] = useState(1)
  const [openDate, setOpenDate] = useState("")
  const [closeDate, setCloseDate] = useState("")

  // Requirements
  const [requirements, setRequirements] = useState<RequirementData[]>([
    {
      id: "1",
      title: "",
      sub_title: "",
      step_number: 1,
      max_size_mb: "5",
      document_type: "document",
      allowed_file_types: ["pdf"],
    },
  ])

  const addRequirement = () => {
    const newRequirement: RequirementData = {
      id: Date.now().toString(),
      title: "",
      sub_title: "",
      step_number: requirements.length + 1,
      max_size_mb: "5",
      document_type: "document",
      allowed_file_types: ["pdf"],
    }
    setRequirements([...requirements, newRequirement])
    setStepsCount(requirements.length + 1)
  }

  const removeRequirement = (id: string) => {
    const filtered = requirements.filter((req) => req.id !== id)
    // Reorder step numbers
    const reordered = filtered.map((req, index) => ({
      ...req,
      step_number: index + 1,
    }))
    setRequirements(reordered)
    setStepsCount(reordered.length)
  }

  const updateRequirement = (id: string, data: Partial<RequirementData>) => {
    setRequirements(requirements.map((req) => (req.id === id ? { ...req, ...data } : req)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !subTitle || !openDate || !closeDate) {
      toast.error('Por favor complete todos los campos obligatorios.')
      return
    }

    // Validate requirements
    const invalidRequirements = requirements.filter(
      (req) => !req.title || !req.sub_title || req.allowed_file_types.length === 0,
    )

    if (invalidRequirements.length > 0) {
       toast.error('Por favor complete todos los campos de los requisitos.')
      return
    }

    setIsSubmitting(true)

    try {
      const processData = {
        title,
        sub_title: subTitle,
        comment,
        steps_count: stepsCount,
        open_date: new Date(openDate),
        close_date: new Date(closeDate),
        created_by: "admin_user_id", // This should come from auth
        requirements: requirements.map((req) => ({
          title: req.title,
          sub_title: req.sub_title,
          step_number: req.step_number,
          max_size_mb: req.max_size_mb,
          url_file_expamle: req.url_file_example,
          document_type: req.document_type,
          allowed_file_types: req.allowed_file_types,
        })),
    
      }
      if(DocumenType.document===processData.requirements[0].document_type){
        console.log('docuentos iguales');
        
      }

    //   await createScholarshipProcess(processData)

       toast.success('Proceso de beca creado correctamente.')
      router.push("/scholarships")
    } catch (error) {
       toast.error('Hubo un error al crear el proceso de beca.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Scholarship Process Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información del Proceso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Beca de Excelencia Académica 2024"
                
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub_title">Subtítulo *</Label>
              <Input
                id="sub_title"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Ej: Para estudiantes de pregrado"
                
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Descripción</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Descripción detallada del proceso de beca..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps_count">Número de Pasos</Label>
              <Input
                id="steps_count"
                type="number"
                value={stepsCount}
                onChange={(e) => setStepsCount(Number.parseInt(e.target.value) || 1)}
                min="1"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="open_date">Fecha de Apertura *</Label>
              <Input
                id="open_date"
                type="datetime-local"
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
                
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="close_date">Fecha de Cierre *</Label>
              <Input
                id="close_date"
                type="datetime-local"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
                
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Requisitos del Proceso</CardTitle>
            <Button
              type="button"
              onClick={addRequirement}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Requisito
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {requirements.map((requirement, index) => (
            <div key={requirement.id} className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Requisito {index + 1}</h3>
                {requirements.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeRequirement(requirement.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <RequirementForm requirement={requirement} onUpdate={(data) => updateRequirement(requirement.id, data)} />
              {index < requirements.length - 1 && <div className="mt-6 border-b border-gray-200" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Creando..." : "Crear Proceso de Beca"}
        </Button>
      </div>
    </form>
  )
}
