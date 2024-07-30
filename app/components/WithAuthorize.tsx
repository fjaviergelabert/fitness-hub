import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export type AuthProps = PropsWithChildren<{ fallback?: React.ReactElement }>;

export const withAuthentication =
  (role?: UserRole) =>
  ({ fallback, children }: AuthProps) => {
    const session = useSession();

    if (session?.status === "unauthenticated") {
      return fallback || null;
    }

    if (role && session?.data?.user.role !== role) {
      return fallback || null;
    }

    return children;
  };
