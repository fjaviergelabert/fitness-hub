"use server";

import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateRole = async (userId: string, role: UserRole) => {
  await prisma.user.update({
    data: { role },
    where: { id: userId },
  });
  revalidatePath("/admin/users");
};
