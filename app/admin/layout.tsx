import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return redirect("/api/auth/signin", RedirectType.push);
  }

  return children;
}
