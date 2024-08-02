"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { profileSchema } from "@/schemas";
import { User } from "@prisma/client";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import { withProtectedRoute } from "../components/Authorize/WithProtectedRoute";
import { ProfileForm } from "./ProfileForm";

async function ProfilePage() {
  const session = await auth();
  return (
    <>
      <Flex align={"center"} direction={"column"} asChild>
        <Heading as="h1">Profile</Heading>
      </Flex>
      <Flex asChild>
        <Section>
          <ProfileForm session={session!} />
        </Section>
      </Flex>
    </>
  );
}

export default withProtectedRoute()(ProfilePage);

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

  revalidatePath("/");
}
