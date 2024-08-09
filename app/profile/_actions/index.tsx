"use server";

import { withSession } from "@/app/_shared/lib/WithSession";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { profileSchema } from "@/schemas";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";

async function _updateUser(user: User) {
  const validation = profileSchema.safeParse(user);
  const session = await auth();

  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  await prisma.user.update({
    data: { name: user.name, image: user.image },
    where: { id: session!.user.id },
  });

  revalidatePath("/profile");
}

export const updateProfile = withSession()(_updateUser);
