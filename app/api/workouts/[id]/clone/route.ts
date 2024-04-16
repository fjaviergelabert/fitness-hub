import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const workout = await prisma.block.findUnique({
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
    return NextResponse.json({ error: "Workout not found." }, { status: 404 });
  }

  const clonedWorkout = await prisma.block.create({
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

  return NextResponse.json(clonedWorkout);
}
