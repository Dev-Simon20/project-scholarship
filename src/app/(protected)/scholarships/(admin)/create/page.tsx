import { CreateScholarshipProcessForm } from "@/components/create_process/create_process";

export default function CreateScholarshipProcessPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Crear Proceso de Beca</h1>
          <p className="text-muted-foreground mt-2">
            Complete la información del proceso de beca y agregue los requisitos necesarios.
          </p>
        </div>
        <CreateScholarshipProcessForm />
      </div>
    </div>
  )
}
