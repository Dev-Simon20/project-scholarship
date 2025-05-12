import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prismaDb = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaDb