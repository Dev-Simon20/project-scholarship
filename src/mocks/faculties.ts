import { Faculty } from "@/types/faculty";
export const mockFaculties: Faculty[] = [
   {
      id: 1,
      name: "Facultad de Ingeniería Industrial y sistemas",
      creation_date: new Date("2001-03-15"),
      schools: [
         { id: 1, faculty_id: 1, name: "Ingeniería de Sistemas" },
         { id: 2, faculty_id: 1, name: "Ingeniería Industrial" },
      ],
   },
   {
      id: 2,
      name: "Facultad de Ciencias Sociales",
      creation_date: new Date("1998-08-22"),
      schools: [
         { id: 3, faculty_id: 2, name: "Sociología" },
         { id: 4, faculty_id: 2, name: "Trabajo Social" },
      ],
   },
   {
      id: 3,
      name: "Facultad de Medicina",
      creation_date: new Date("2005-01-10"),
      schools: [
         { id: 5, faculty_id: 3, name: "Medicina Humana" },
         { id: 6, faculty_id: 3, name: "Enfermería" },
      ],
   },
   {
      id: 4,
      name: "Facultad de Derecho",
      creation_date: new Date("1995-06-05"),
      schools: [{ id: 7, faculty_id: 4, name: "Derecho y Ciencias Políticas" }],
   },
   {
      id: 5,
      name: "Facultad de Educación",
      creation_date: new Date("2000-09-12"),
      schools: [
         { id: 8, faculty_id: 5, name: "Educación Inicial" },
         { id: 9, faculty_id: 5, name: "Educación Secundaria" },
      ],
   },
];
