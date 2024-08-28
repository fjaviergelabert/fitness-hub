import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard", RedirectType.push);
  }

  return <section>Home Page Content</section>;
}
