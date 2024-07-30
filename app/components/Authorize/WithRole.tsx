import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";

type AuthProps = PropsWithChildren<{ fallback?: React.ReactElement }>;

export function Authenticated({ fallback, children }: AuthProps) {
  const session = useSession();

  if (session?.status === "unauthenticated") {
    return fallback || null;
  }

  return children;
}

export const withRole = (role?: UserRole) => {
  const Component: React.FC<AuthProps> = ({
    fallback,
    children,
  }: AuthProps) => {
    const session = useSession();

    if (role && session?.data?.user.role !== role) {
      return fallback || null;
    }

    return <Authenticated fallback={fallback}>{children}</Authenticated>;
  };
  Component.displayName = "abcd";
  return Component;
};
