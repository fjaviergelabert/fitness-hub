"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { UserWorkoutSchema, userWorkoutSchema } from "@/schemas";

export async function _createUserWorkout(userWorkout: UserWorkoutSchema) {
  const validation = userWorkoutSchema.safeParse(userWorkout);
  if (!validation.success) {
    return {
      errors: validation.error.format(),
    };
  }

  const session = await auth();

  try {
    await prisma.userWorkout.create({
      data: {
        workoutId: userWorkout.workoutId,
        userId: session?.user.id!,
        exercises: {
          create: userWorkout.exercises,
        },
      },
    });
  } catch (error) {
    return {
      errors:
        "An error has occurred while creating the Workout: Error - " + error,
    };
  }
}
