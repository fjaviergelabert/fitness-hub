"use server";

import { withAdminRole } from "@/app/lib/WithSession";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function _updateRole(userId: string, role: UserRole) {
  await prisma.user.update({
    data: { role },
    where: { id: userId },
  });
  revalidatePath("/admin/users");
}

async function _getUsers() {
  const session = await auth();
  return session?.user
    ? await prisma.user.findMany({
        ...(process.env.NODE_ENV !== "development"
          ? { where: { email: { not: session.user.email } } }
          : {}),
      })
    : [];
}

export const updateRole = withAdminRole(_updateRole);
export const getUsers = withAdminRole(_getUsers);
