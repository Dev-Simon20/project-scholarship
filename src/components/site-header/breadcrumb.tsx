"use client";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface Ruta {
   path: string;
   name: string;
}

function generarRutas(url: string): Ruta[] {
   const partes = url.split("/").filter(Boolean); // Divide la URL y elimina elementos vacíos
   let acumulador = "";

   return partes.map((parte, index) => {
      acumulador += `/${parte}`;
      return {
         path: acumulador,
         name: parte
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()), // Formato de nombre
      };
   });
}

const Breadcum = () => {
   const pathname = usePathname();   
   const roots = generarRutas(pathname).slice(2);

   return (
      <Breadcrumb>
         <BreadcrumbList className="gap-0">
            {roots.map((ruta, index) => (
               <Fragment key={index} >
                  <BreadcrumbItem className="">
                     {index !== roots.length - 1 ? (
                        <BreadcrumbLink href={ruta.path}>
                           {ruta.name}
                        </BreadcrumbLink>
                     ) : (
                        <BreadcrumbPage>{ruta.name}</BreadcrumbPage>
                     )}
                  </BreadcrumbItem>
                  {index !== roots.length - 1 && <BreadcrumbSeparator />}
               </Fragment>
            ))}
         </BreadcrumbList>
      </Breadcrumb>
   );
};
export default Breadcum;