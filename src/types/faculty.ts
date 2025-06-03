import { School } from "@prisma/client";

export interface Faculty {
   id: number;
   name: string;
   creation_date: Date;
   schools:School[]
}
