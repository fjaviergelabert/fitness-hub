"use server";

import { withPersonalTrainerRole } from "@/app/_shared/lib/WithSession";
import prisma from "@/prisma/client";
import { updateWorkoutSchema, Workout, workoutSchema } from "@/schemas";

export async function getWorkout(id: number) {
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
    })),
  };
}

async function _createWorkout(workout: Workout) {
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
    return await prisma.workout.create({
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

async function _updateWorkout(workout: Workout) {
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
      prisma.workoutExercise.deleteMany({
        where: { workoutId: Number(workout.id) },
      }),
      prisma.workout.update({
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

async function _cloneWorkout(id: number) {
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

  const clonedWorkout = await prisma.workout.create({
    data: {
      name: workout.name + " - Copy: " + Date.now(),
      description: workout.description,
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

async function _deleteWorkout(id: number) {
  await prisma.$transaction([
    prisma.workoutExercise.deleteMany({
      where: { workoutId: id },
    }),
    prisma.workout.delete({
      where: { id },
    }),
  ]);
}

export const createWorkout = withPersonalTrainerRole(_createWorkout);
export const updateWorkout = withPersonalTrainerRole(_updateWorkout);
export const cloneWorkout = withPersonalTrainerRole(_cloneWorkout);
export const deleteWorkout = withPersonalTrainerRole(_deleteWorkout);
