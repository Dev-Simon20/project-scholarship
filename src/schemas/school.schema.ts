import { number, string, z } from "zod";

export const SchoolSchema=z.object({
    faculty_id:number({required_error:"La facultad es requerida"}),
    name:string({required_error:'El Nombre de la escuela es requerido'}).min(5,'La escuela debe de tener minimo 5 caracteres')
})