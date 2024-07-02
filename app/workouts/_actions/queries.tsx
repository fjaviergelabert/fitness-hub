"use server";

import prisma from "@/prisma/client";

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
