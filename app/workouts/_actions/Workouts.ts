"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { updateWorkoutSchema, Workout, workoutSchema } from "@/schemas";

export async function _getWorkout(id: number) {
  const dbWorkout = await prisma.workout.findUnique({
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
      exerciseId: e.exercise.id,
      id: e.id,
    })),
  };
}

export async function _createWorkout(workout: Workout) {
  const validation = workoutSchema.safeParse(workout);
  if (!validation.success) {
    return {
      errors: validation.error.format(),
    };
  }

  if (await prisma.workout.findUnique({ where: { name: workout.name } })) {
    return {
      errors: { name: "Workout `name` already exists." },
    };
  }

  const duplicatedExercises = await prisma.exercise.findMany({
    where: {
      name: {
        in: workout.exercises
          .filter((e) => !e.id && e?.id! > 0)
          .map((e) => e.name),
      },
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

  const session = await auth();

  try {
    const newExercisesCreation = prisma.exercise.createMany({
      data: workout.exercises.map((e) => ({
        name: e.name,
        description: e.description,
        mediaUrl: e.mediaUrl,
      })),
      skipDuplicates: true,
    });

    const updateWorkout = prisma.workout.create({
      data: {
        name: workout.name,
        description: workout.description,
        user: {
          connect: {
            id: session?.user.id,
          },
        },
        exercises: {
          create: workout.exercises.map((exercise) => ({
            type: exercise.type,
            orderId: exercise.orderId,
            exercise: {
              connect: {
                name: exercise.name,
              },
            },
          })),
        },
      },
    });

    await prisma.$transaction([newExercisesCreation, updateWorkout]);
  } catch (error) {
    throw new Error(
      "An error has occurred while creating the Workout: Error - " + error
    );
  }
}

export async function _updateWorkout(workout: Workout) {
  const validation = updateWorkoutSchema.safeParse(workout);
  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  const dbWorkout = await prisma.workout.findUnique({
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
    (await prisma.workout.findUnique({ where: { name: workout.name } }))
  ) {
    return {
      errors: { name: "Workout `name` already exists." },
    };
  }

  const duplicatedExercises = await prisma.exercise.findMany({
    where: {
      name: {
        in: workout.exercises
          .filter((e) => !e.id && e?.id! > 0)
          .map((e) => e.name),
      },
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
    const newExercisesCreation = prisma.exercise.createMany({
      data: workout.exercises.map((e) => ({
        name: e.name,
        description: e.description,
        mediaUrl: e.mediaUrl,
      })),
      skipDuplicates: true,
    });

    const deleteUnusedExercises = prisma.workoutExercise.deleteMany({
      where: {
        workoutId: workout.id,
        id: {
          notIn: workout.exercises.map((e) => e.id!),
        },
      },
    });

    const updateWorkout = prisma.workout.update({
      where: { id: Number(workout.id) },
      data: {
        name: workout.name,
        description: workout.description,
        exercises: {
          upsert: workout.exercises.map((e) => ({
            create: {
              type: e.type,
              orderId: e.orderId,
              exercise: {
                connect: {
                  name: e.name,
                },
              },
            },
            update: {
              type: e.type,
              orderId: e.orderId,
              exercise: {
                connect: {
                  name: e.name,
                },
              },
            },
            where: {
              id: e.id!,
            },
          })),
        },
      },
    });

    await prisma.$transaction([
      newExercisesCreation,
      deleteUnusedExercises,
      updateWorkout,
    ]);
  } catch (error) {
    // TODO: Transform error correctly
    throw new Error(
      "An error has occurred while updating the Workout: " + error
    );
  }
}

export async function _cloneWorkout(id: number) {
  const workout = await prisma.workout.findUnique({
    where: { id: Number(id) },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!workout) {
    return { errors: "Workout not found." };
  }

  const session = await auth();

  const clonedWorkout = await prisma.workout.create({
    data: {
      name: workout.name + " - Copy: " + Date.now(),
      description: workout.description,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
      exercises: {
        create: workout.exercises.map((exercise) => ({
          type: exercise.type,
          orderId: exercise.orderId,
          exercise: {
            connectOrCreate: {
              create: {
                name: exercise.exercise.name,
                description: exercise.exercise.description,
                mediaUrl: exercise.exercise.mediaUrl,
              },
              where: {
                id: exercise.exerciseId,
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

  return clonedWorkout;
}

export async function _deleteWorkout(id: number) {
  await prisma.$transaction([
    prisma.workoutExercise.deleteMany({
      where: { workoutId: id },
    }),
    prisma.workout.delete({
      where: { id },
    }),
  ]);
}
