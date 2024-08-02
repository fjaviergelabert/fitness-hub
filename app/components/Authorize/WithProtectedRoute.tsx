import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

export const withProtectedRoute =
  (roles: UserRole[] = []) =>
  // TODO: Figure this type out
  (ProtectedComponent: any) => {
    const NewComponent = async (props: React.PropsWithChildren<any>) => {
      const session = await auth();
      console.log("first", session);
      if (!session?.user) {
        return redirect("/api/auth/signin", RedirectType.push);
      }

      if (roles.length > 0 && !roles.includes(session?.user.role!)) {
        return redirect("/unauthorized", RedirectType.push);
      }

      return <ProtectedComponent {...props} />;
    };
    return NewComponent;
  };
