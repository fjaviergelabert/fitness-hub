import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";

type AuthProps = PropsWithChildren<{ fallback?: React.ReactElement }>;

export const withRole =
  (roles: UserRole[] = []) =>
  ({ fallback, children }: AuthProps) => {
    const session = useSession();

    if (session?.status === "unauthenticated") {
      return fallback || null;
    }

    if (roles.length > 0 && !roles.includes(session?.data?.user.role!)) {
      return fallback || null;
    }

    return children;
  };
