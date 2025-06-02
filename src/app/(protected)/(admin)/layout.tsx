import { auth } from "@nextAuth/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdminLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();
   if (!session) redirect("/log-in");
   if (session.user.role != Role.admin) redirect("/scholarships");
   return <>{children}</>;
}
