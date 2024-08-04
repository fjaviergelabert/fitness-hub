"use server";

import prisma from "@/prisma/client";
import { profileSchema } from "@/schemas";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";

export async function updateUser(userId: string, user: User) {
  const validation = profileSchema.safeParse(user);

  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  await prisma.user.update({
    data: { name: user.name, image: user.image },
    where: { id: userId },
  });

  revalidatePath("/profile");
}
