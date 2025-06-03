"use client";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { mockFaculties } from "@/mocks/faculties";
import { Faculty } from "@/types/faculty";
import { sanitizeText } from "@/utils/sanitizeText";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
   ChevronDown,
   ChevronRight,
   Edit,
   Plus,
   Search,
   SearchCheckIcon,
   Trash2,
   XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const FacultiesPage = () => {
   const [faculties, setFaculties] = useState<Faculty[]>([]);
   const [openItems, setOpenItems] = useState<string[]>(["1"]);
   const [searcher, setSearcher] = useState<string>("");

   const toggleItem = (id: string) => {
      setOpenItems((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };

   useEffect(() => {
      setTimeout(() => {
         setFaculties(mockFaculties);
      }, 1600);
   }, []);

   useEffect(() => {
      console.log(searcher);
   }, [searcher]);

   const filteredData = faculties.filter((faculty) => {
      const facultyNameMatches = sanitizeText(faculty.name).includes(
         sanitizeText(searcher)
      );

      const schoolNameMatches = faculty.schools?.some((school) =>
         sanitizeText(school.name).includes(sanitizeText(searcher))
      );

      return facultyNameMatches || schoolNameMatches;
   });

   return (
      <div className="container  flex flex-col">
         <div className="w-full max-w-4xl mx-auto  flex justify-between mt-8 mb-4 gap-16">
            <div className="flex-1 relative ">
               <Search className="absolute size-4 top-1/2 -translate-y-1/2 left-2" />
               <Input
                  type="text"
                  placeholder="Busca por el nombre de la facultad o escuela"
                  className="px-8"
                  onChange={(e) => setSearcher(e.target.value)}
                  value={searcher}
               />

               <XIcon
                  className="absolute size-6 top-1/2 -translate-y-1/2 right-2 bg-gray-100 dark:bg-neutral-700 rounded-full p-1 cursor-pointer"
                  onClick={() => setSearcher("")}
               />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
               <Plus className="h-4 w-4 mr-2" />
               Nueva Facultad
            </Button>
         </div>
         <div className="w-full max-w-4xl mx-auto bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-sm ">
            {faculties.length < 1 ? (
               Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                     key={index}
                     className="h-16 w-full rounded-xl mt-4 first:mt-0"
                  />
               ))
            ) : filteredData.length < 1 ? (
               <div className="my-16 mx-auto  text-center">
                  No se encontraron coincidencias
               </div>
            ) : (
               filteredData.map((faculty) => (
                  <Collapsible
                     key={faculty.id}
                     open={openItems.includes(faculty.id.toString())}
                     onOpenChange={() => toggleItem(faculty.id.toString())}
                  >
                     <div className="flex items-center justify-between p-4 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                           <CollapsibleTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="h-8 w-8 p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-700"
                              >
                                 {openItems.includes(faculty.id.toString()) ? (
                                    <ChevronDown className="h-4 w-4" />
                                 ) : (
                                    <ChevronRight className="h-4 w-4" />
                                 )}
                              </Button>
                           </CollapsibleTrigger>
                           <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {faculty.name}
                           </span>
                        </div>

                        <div className="flex items-center gap-2">
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-700"
                           >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">
                                 Edit {faculty.name}
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
                           >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">
                                 Delete {faculty.name}
                              </span>
                           </Button>
                        </div>
                     </div>

                     <CollapsibleContent>
                        {faculty.schools.length > 0 ? (
                           <div className="px-4 pb-4 pt-1">
                              <div className="flex items-center justify-between mb-3">
                                 <h3 className="text-sm font-medium text-neutral-700 dark:text-gray-300">
                                    Escuelas
                                 </h3>
                                 <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                 >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Nueva Escuela
                                 </Button>
                              </div>
                              <div className="space-y-2">
                                 {faculty.schools.map((school) => (
                                    <div
                                       key={school.id}
                                       className="flex items-center justify-between p-3 bg-neutral-200/50 dark:bg-neutral-800 rounded-md"
                                    >
                                       <span className="text-sm text-gray-800 dark:text-gray-200">
                                          {school.name}
                                       </span>
                                       <div className="flex items-center gap-1">
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="h-7 w-7 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-700"
                                          >
                                             <Edit className="h-3 w-3" />
                                             <span className="sr-only">
                                                Edit {school.name}
                                             </span>
                                          </Button>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="h-7 w-7 p-0 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                                          >
                                             <Trash2 className="h-3 w-3" />
                                             <span className="sr-only">
                                                Delete {school.name}
                                             </span>
                                          </Button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <div className="px-4 pb-4">
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                 Escuelas no disponibles
                              </p>
                           </div>
                        )}
                     </CollapsibleContent>
                  </Collapsible>
               ))
            )}
         </div>
      </div>
   );
};
export default FacultiesPage;
