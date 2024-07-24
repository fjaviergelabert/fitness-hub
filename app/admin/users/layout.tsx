import { auth } from "@/auth";
import { User } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session || (session!.user as User).role !== "ADMIN") {
    redirect("/workouts", RedirectType.push);
  }

  return children;
}
