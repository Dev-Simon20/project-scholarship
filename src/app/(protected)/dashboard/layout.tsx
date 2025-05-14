import { auth } from "@nextAuth/auth";
import { redirect } from "next/navigation";

export default async function SchoolDashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();
   if (!session) redirect("/log-in");
   return <main className="bg-blue-500">{children}</main>;
}
