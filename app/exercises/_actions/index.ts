"use server";
import prisma from "@/prisma/client";
import { exerciseSchema, updateExerciseSchema } from "@/schemas/exercise";
import { Exercise } from "@prisma/client";

export async function deleteExercise(id: number) {
  const workouts = await prisma.blockExercise.findMany({
    where: { exerciseId: id },
  });
  if (workouts.length > 0) {
    return { errors: "Exercise is being used in a workout." };
  }

  await prisma.exercise.delete({
    where: { id: id },
  });
}

export async function createExercise(exercise: Exercise) {
  const validation = exerciseSchema.safeParse(exercise);
  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  if (await prisma.exercise.findUnique({ where: { name: exercise.name } })) {
    return { errors: "Exercise already exists." };
  }

  const newExercise = await prisma.exercise.create({
    data: {
      name: exercise.name,
      description: exercise.description,
      mediaUrl: exercise.mediaUrl,
    },
  });

  return newExercise;
}

export async function updateExercise(exercise: Exercise) {
  const validation = updateExerciseSchema.safeParse(exercise);
  if (!validation.success) {
    return {
      errors: validation.error.errors,
    };
  }

  const exerciseId = exercise.id;
  const dbExercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  });
  if (!dbExercise) {
    return { errors: "Exercise not found." };
  }

  try {
    const newExercise = await prisma.exercise.update({
      where: { id: exerciseId },
      data: {
        name: exercise.name,
        description: exercise.description,
        mediaUrl: exercise.mediaUrl,
      },
    });

    return newExercise;
  } catch (error) {
    throw error;
  }
}
