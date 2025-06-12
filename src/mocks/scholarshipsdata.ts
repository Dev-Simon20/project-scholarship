import { ScholarshipProcess } from "@/types/scholarship-process"

// Función para generar fechas relativas
const getRelativeDate = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

// Datos mock para procesos de beca
export async function getMockScholarshipProcesses(): Promise<ScholarshipProcess[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      created_by: "admin_user_id",
      title: "Beca de Excelencia Académica 2024",
      sub_title: "Para estudiantes de pregrado con promedio superior a 9.0",
      comment: "Esta beca está destinada a reconocer el mérito académico de los estudiantes más destacados.",
      steps_count: 3,
      open_date: getRelativeDate(-10), // Abierto hace 10 días
      close_date: getRelativeDate(20), // Cierra en 20 días
      requirements:4,
      student_processes:3,
    },
    {
      id: 2,
      created_by: "admin_user_id",
      title: "Beca Deportiva Universidad Nacional",
      sub_title: "Para estudiantes destacados en disciplinas deportivas",
      comment:
        "Dirigida a estudiantes que representan a la universidad en competencias deportivas nacionales e internacionales.",
      steps_count: 4,
      open_date: getRelativeDate(5), // Abre en 5 días
      close_date: getRelativeDate(45), // Cierra en 45 días
      requirements:8,
      student_processes: 7,
    },
    {
      id: 3,
      created_by: "admin_user_id",
      title: "Beca Socioeconómica 2024",
      sub_title: "Apoyo para estudiantes de bajos recursos",
      comment:
        "Esta beca busca garantizar el acceso a la educación superior a estudiantes con dificultades económicas.",
      steps_count: 5,
      open_date: getRelativeDate(-30), // Abierto hace 30 días
      close_date: getRelativeDate(-5), // Cerrado hace 5 días
      requirements: 2,
      student_processes:7,
    },
    {
      id: 4,
      created_by: "admin_user_id",
      title: "Beca de Investigación Científica",
      sub_title: "Para proyectos de investigación innovadores",
      comment: "Destinada a estudiantes con interés en desarrollar proyectos de investigación en áreas prioritarias.",
      steps_count: 3,
      open_date: getRelativeDate(-15), // Abierto hace 15 días
      close_date: getRelativeDate(15), // Cierra en 15 días
      requirements:1,
      student_processes: 4,
    },
    {
      id: 5,
      created_by: "admin_user_id",
      title: "Beca de Movilidad Internacional",
      sub_title: "Para estudios en universidades extranjeras",
      comment: "Ofrece la oportunidad de realizar un semestre académico en una universidad extranjera con convenio.",
      steps_count: 4,
      open_date: getRelativeDate(-60), // Abierto hace 60 días
      close_date: getRelativeDate(-20), // Cerrado hace 20 días
      requirements:1,
      student_processes: 2,
    },
    {
      id: 6,
      created_by: "admin_user_id",
      title: "Beca para Estudiantes con Discapacidad",
      sub_title: "Apoyo integral para estudiantes con necesidades especiales",
      comment: "Busca garantizar la inclusión y permanencia de estudiantes con discapacidad en la educación superior.",
      steps_count: 3,
      open_date: getRelativeDate(-5), // Abierto hace 5 días
      close_date: getRelativeDate(25), // Cierra en 25 días
      requirements: 5,
      student_processes: 4
     },
  ]
}
