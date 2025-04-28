"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const ButtonDarkMode = () => {
   const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Siempre 'light' al inicio
   const [mounted, setMounted] = useState(false); // 👈 Importante para evitar parpadeo en el Switch

   useEffect(() => {
      setMounted(true); // Ahora sabemos que estamos en cliente

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
         setTheme("dark");
         document.querySelector("html")?.classList.add("dark");
      } else {
         setTheme("light");
         document.querySelector("html")?.classList.remove("dark");
      }
   }, []);

   useEffect(() => {
      if (!mounted) return; // Evitar cambiar antes de montar
      if (theme === "dark") {
         document.querySelector("html")?.classList.add("dark");
      } else {
         document.querySelector("html")?.classList.remove("dark");
      }
   }, [theme, mounted]);

   if (!mounted) return null; // 👈 Muy importante para no renderizar antes de montar

   return (
      <Switch
         checked={theme === "dark"}
         onCheckedChange={() => {
            setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
         }}
      />
   );
};

export default ButtonDarkMode;
