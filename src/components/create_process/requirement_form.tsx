"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, File, X } from "lucide-react"
import type { RequirementData } from "./create_process"
import { simulateFileUpload } from "@/lib/file-upload"
import { AllowedFileTypes, DocumenType } from "@prisma/client"

interface RequirementFormProps {
  requirement: RequirementData
  onUpdate: (data: Partial<RequirementData>) => void
}

const documentTypes = [
  { value: DocumenType.image, label: "Imagen" },
  { value: DocumenType.video, label: "Video" },
  { value: DocumenType.document, label: "Documento" },
]

const fileTypesByCategory = {
  image: ["jpg", "jpeg", "png", "gif", "svg", "webp"],
  video: ["mp4", "mov", "avi", "mkv", "webm"],
  document: ["pdf", "doc", "docx", "txt"],
}

export function RequirementForm({ requirement, onUpdate }: RequirementFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState<string>("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFileName(file.name)

    try {
      // Simulate file upload
      const uploadedUrl = await simulateFileUpload(file)
      onUpdate({ url_file_example: uploadedUrl })

    //   toast({
    //     title: "Archivo subido",
    //     description: `${file.name} se ha subido correctamente.`,
    //   })
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Error al subir el archivo.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    onUpdate({ url_file_example: undefined })
    setUploadedFileName("")
  }

  const handleDocumentTypeChange = (value: string) => {
    const docType = value as "image" | "video" | "document"
    onUpdate({
      document_type: docType,
      allowed_file_types: fileTypesByCategory[docType],
    })
  }

  const handleFileTypeToggle = (fileType: string, checked: boolean) => {
    const currentTypes = requirement.allowed_file_types
    const newTypes = checked ? [...currentTypes, fileType] : currentTypes.filter((type) => type !== fileType)

    onUpdate({ allowed_file_types: newTypes })
  }

  const availableFileTypes = fileTypesByCategory[requirement.document_type] || []

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${requirement.id}`}>Título del Requisito *</Label>
          <Input
            id={`title-${requirement.id}`}
            value={requirement.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Ej: Certificado de Notas"
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`sub_title-${requirement.id}`}>Subtítulo *</Label>
          <Input
            id={`sub_title-${requirement.id}`}
            value={requirement.sub_title}
            onChange={(e) => onUpdate({ sub_title: e.target.value })}
            placeholder="Ej: Últimos 2 semestres"
            
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`step-${requirement.id}`}>Número de Paso</Label>
          <Input
            id={`step-${requirement.id}`}
            type="number"
            value={requirement.step_number}
            onChange={(e) => onUpdate({ step_number: Number.parseInt(e.target.value) || 1 })}
            min="1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`size-${requirement.id}`}>Tamaño Máximo (MB)</Label>
          <Input
            id={`size-${requirement.id}`}
            value={requirement.max_size_mb}
            onChange={(e) => onUpdate({ max_size_mb: e.target.value })}
            placeholder="5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`doc-type-${requirement.id}`}>Tipo de Documento</Label>
          <Select value={requirement.document_type} onValueChange={handleDocumentTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* File Types Selection */}
      <div className="space-y-2">
        <Label>Tipos de Archivo Permitidos *</Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {availableFileTypes.map((fileType) => (
            <div key={fileType} className="flex items-center space-x-2">
              <Checkbox
                id={`${requirement.id}-${fileType}`}
                checked={requirement.allowed_file_types.includes(fileType)}
                onCheckedChange={(checked) => handleFileTypeToggle(fileType, checked as boolean)}
              />
              <Label htmlFor={`${requirement.id}-${fileType}`} className="text-sm font-normal">
                .{fileType}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Archivo de Ejemplo (Opcional)</Label>
        {requirement.url_file_example ? (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{uploadedFileName || "Archivo subido"}</span>
            </div>
            <Button type="button" onClick={removeFile} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Label htmlFor={`file-${requirement.id}`} className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {isUploading ? "Subiendo..." : "Subir archivo de ejemplo"}
                  </span>
                </Label>
                <Input
                  id={`file-${requirement.id}`}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  accept={requirement.allowed_file_types.map((type) => `.${type}`).join(",")}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Tipos permitidos: {requirement.allowed_file_types.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
