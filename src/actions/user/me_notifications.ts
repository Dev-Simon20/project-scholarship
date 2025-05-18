'use server'
import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth"
import { AuthError } from "next-auth";

export const me_notifications=async()=>{

    try {
        const session= await auth();
        const user_id=session?.user.id;
        if(!user_id){
            throw new Error('El usario no existe')
        }

        const notification=await prismaDb.notification.findMany({
            where:{
                user_id:user_id
            }
        })

        return notification.reverse()

    } catch (error) {
        console.log('el errors es: ',error);
        
        if(error instanceof  AuthError){
            return{
                error:error.cause?.err?.message
            }
        }
        if(error instanceof Error){
            return{
                error:error.message
            }
        }
        return{
            error:"Error desconocido"
        }
    }
    
}