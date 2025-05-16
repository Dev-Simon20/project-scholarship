"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

function getThemeFromCookie(): "dark" | "light" {
   // Busca la cookie 'theme' en document.cookie
   if (typeof document === "undefined") return "light"; // seguridad para SSR
   const match = document.cookie.match(/theme=(dark|light)/);
   return match ? (match[1] as "dark" | "light") : "light";
}

function setThemeCookie(theme: "dark" | "light") {
   // Guarda la cookie con duración 1 año y path en /
   document.cookie = `theme=${theme}; path=/; max-age=${
      60 * 60 * 24 * 365
   }; SameSite=Lax`;
}

const ButtonDarkMode = () => {
   const [theme, setTheme] = useState<"light" | "dark">("light");
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const savedTheme = getThemeFromCookie();

      setTheme(savedTheme);

      if (savedTheme === "dark") {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, []);

   const toggleTheme = () => {
      setTheme((prev) => {
         const newTheme = prev === "light" ? "dark" : "light";
         setThemeCookie(newTheme);

         if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
         } else {
            document.documentElement.classList.remove("dark");
         }

         return newTheme;
      });
   };

   if (!mounted) return null; // Evitar render antes de que se sincronice el estado con la cookie

   return (
      <Button
         variant={"outline"}
         size={"icon"}
         className=" rounded-full"
         onClick={toggleTheme}
      >
         {theme === "light" && <Moon className="" />}
         {theme === "dark" && <Sun className="" />}
      </Button>
   );
};

export default ButtonDarkMode;
