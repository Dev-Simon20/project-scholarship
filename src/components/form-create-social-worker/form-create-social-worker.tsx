"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Faculty } from "@/types/faculty"
import {  type SocialWorkerFormData } from "@/types/social-worker"
import { getAllFaculties } from "@/actions/faculties/getAll"
import { createSocialWorkerSchema } from "@/schemas/social_worker.schema"
import { SocialWorkerStatus } from "@prisma/client"

// Schema de validación con Zod - dinámico según el modo


interface SocialWorkerFormProps {
  mode: "create" | "edit"
  initialData?: SocialWorkerFormData
  socialWorkerId?: string
  onSubmit: (data: SocialWorkerFormData) => Promise<void>
  onCancel?: () => void
}

export default function SocialWorkerForm({
  mode,
  initialData,
  socialWorkerId,
  onSubmit,
  onCancel,
}: SocialWorkerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [isLoading, setIsLoading] = useState(mode === "edit")

  const isEditMode = mode === "edit"
  const schema = createSocialWorkerSchema(isEditMode)
  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      names: "",
      first_lastname: "",
      second_lastname: "",
      phone_number: "",
      dni: "",
      email: "",
      password: "",
      social_worker_status: SocialWorkerStatus.enabled,
      assigned_faculties: [],
      employment_start_date: new Date(),
    },
  })

  const fetchFaculties = async () => {
    try {
      const res = await getAllFaculties()
      if ("error" in res) {
        console.error("Error las facultades no fueron entregadas", res.error)
      } else {
        setFaculties(res)
      }
    } catch (error) {
      console.error("Error fetching faculties:", error)
    }
  }

  useEffect(() => {
    fetchFaculties()
  }, [])

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset(initialData)
      setIsLoading(false)
    }
  }, [initialData, isEditMode, form])

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data as SocialWorkerFormData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      form.reset()
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Cargando datos...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Editar Trabajador Social" : "Crear Trabajador Social"}</CardTitle>
        <CardDescription>
          {isEditMode
            ? "Modifique los datos del trabajador social"
            : "Complete el formulario para registrar un nuevo trabajador social en el sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese los nombres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primer Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el primer apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="second_lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segundo Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el segundo apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678" maxLength={8} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="987654321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Campo de contraseña - solo en modo creación o edición opcional */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isEditMode ? "Nueva Contraseña (opcional)" : "Contraseña"}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={
                          isEditMode
                            ? "Dejar vacío para mantener la contraseña actual"
                            : "Ingrese una contraseña segura"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {isEditMode
                        ? "Solo complete este campo si desea cambiar la contraseña"
                        : "La contraseña debe tener al menos 8 caracteres"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Información Laboral */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="social_worker_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado del Trabajador Social</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={SocialWorkerStatus.enabled}>Habilitado</SelectItem>
                          <SelectItem value={SocialWorkerStatus.disabled}>Deshabilitado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employment_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Inicio de Empleo</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Asignación de Facultades */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="assigned_faculties"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Facultades Asignadas</FormLabel>
                      <FormDescription>
                        Seleccione las facultades que serán asignadas al trabajador social
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                      {faculties.map((faculty) => (
                        <FormField
                          key={faculty.id}
                          control={form.control}
                          name="assigned_faculties"
                          render={({ field }) => {
                            return (
                              <FormItem key={faculty.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(faculty.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, faculty.id])
                                        : field.onChange(field.value?.filter((value:number) => value !== faculty.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <div>
                                    <div className="font-medium">{faculty.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Creada: {format(faculty.creation_date, "dd/MM/yyyy")}
                                    </div>
                                  </div>
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                {isEditMode ? "Cancelar" : "Limpiar Formulario"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting
                  ? isEditMode
                    ? "Actualizando..."
                    : "Creando..."
                  : isEditMode
                    ? "Actualizar Trabajador Social"
                    : "Crear Trabajador Social"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
