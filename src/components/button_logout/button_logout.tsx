"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const LogoutButton = () => {
   const handleOut = async () => {
      await signOut({
         redirect: true,
         redirectTo: "/log-in",
      });
   };
   return <Button onClick={() => handleOut()}>Cerrar Session</Button>;
};
export default LogoutButton;