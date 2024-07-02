"use server";

import prisma from "@/prisma/client";
import {
  updateWorkoutSchema,
  Workout,
  workoutSchema,
} from "@/schemas/exercise";

export async function getWorkout(id: number) {
  const dbWorkout = await prisma.block.findUnique({
    where: { id: id },
    include: {
      exercises: {
        orderBy: {
          orderId: "asc",
        },
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!dbWorkout) {
    return null;
  }

  return {
    ...dbWorkout,
    exercises: dbWorkout.exercises.map((e) => ({
      type: e.type,
      orderId: e.orderId,
      ...e.exercise,
    })),
  };
}

export async function createWorkout(workout: Workout) {
  const validation = workoutSchema.safeParse(workout);
  if (!validation.success) {
    return {
      errors: validation.error.format(),
    };
  }

  if (await prisma.block.findUnique({ where: { name: workout.name } })) {
    return {
      errors: { name: "Workout `name` already exists." },
    };
  }

  const duplicatedExercises = await prisma.exercise.findMany({
    where: {
      name: { in: workout.exercises.filter((e) => !e?.id).map((e) => e.name) },
    },
  });
  if (duplicatedExercises.length > 0) {
    return {
      errors: {
        exercises: `Some of the exercises already exist: ${duplicatedExercises
          .map((e) => e.name)
          .join(", ")}`,
      },
    };
  }

  try {
    return await prisma.block.create({
      data: {
        name: workout.name,
        description: workout.description,
        exercises: {
          create: workout.exercises.map((exercise) => ({
            type: exercise.type,
            orderId: exercise.orderId,
            exercise: {
              connectOrCreate: {
                create: {
                  name: exercise.name,
                  description: exercise.description,
                  mediaUrl: exercise.mediaUrl,
                },
                where: {
                  id: (exercise?.id as number) || 0,
                },
              },
            },
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(
      "An error has occurred while creating the Workout: Error - " + error
    );
  }
}

export async function updateWorkout(workout: Workout) {
  const validation = updateWorkoutSchema.safeParse(workout);
  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  const dbWorkout = await prisma.block.findUnique({
    where: { id: Number(workout.id) },
  });
  if (!dbWorkout) {
    return {
      errors: "Workout not found.",
    };
  }

  const isSameName = workout.name === dbWorkout.name;
  if (
    !isSameName &&
    (await prisma.block.findUnique({ where: { name: workout.name } }))
  ) {
    return {
      errors: { name: "Workout `name` already exists." },
    };
  }

  const duplicatedExercises = await prisma.exercise.findMany({
    where: {
      name: { in: workout.exercises.filter((e) => !e?.id).map((e) => e.name) },
    },
  });
  if (duplicatedExercises.length > 0) {
    return {
      errors: {
        exercises: `Some of the exercises already exist: ${duplicatedExercises
          .map((e) => e.name)
          .join(", ")}`,
      },
    };
  }

  try {
    const [, t2] = await prisma.$transaction([
      prisma.blockExercise.deleteMany({
        where: { blockId: Number(workout.id) },
      }),
      prisma.block.update({
        where: { id: Number(workout.id) },
        data: {
          name: workout.name,
          description: workout.description,
          exercises: {
            create: workout.exercises.map((exercise) => ({
              type: exercise.type,
              orderId: exercise.orderId,
              exercise: {
                connectOrCreate: {
                  create: {
                    name: exercise.name,
                    description: exercise.description,
                    mediaUrl: exercise.mediaUrl,
                  },
                  where: {
                    id: (exercise?.id as number) || 0,
                  },
                },
              },
            })),
          },
        },
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
      }),
    ]);
    return t2;
  } catch (error) {
    throw new Error(
      "An error has occurred while updating the Workout: Error - " + error
    );
  }
}
