"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function _updateRole(userId: string, role: UserRole) {
  await prisma.user.update({
    data: { role },
    where: { id: userId },
  });
  revalidatePath("/admin/users");
}

export async function _getUsers() {
  const session = await auth();
  return session?.user
    ? await prisma.user.findMany({
        ...(process.env.NODE_ENV !== "development"
          ? { where: { email: { not: session.user.email } } }
          : {}),
      })
    : [];
}
