'use client'

import ButtonDarkMode from "@/components/button-dark-mode/button-dark-mode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
   const router= useRouter()
   
   useEffect(()=>{
      router.push('/log-in')
   },[])

   return (
      <div className="bg-amber-300  ">
         odsd
      </div>
   );
}
