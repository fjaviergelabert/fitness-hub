import prisma from "@/prisma/client";
import { Workout, workoutSchema } from "@/schemas/exercise";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const workouts = await prisma.block.findMany({
    include: { exercises: true },
  });
  return NextResponse.json(workouts);
}

export async function POST(request: NextRequest) {
  const body: Workout = await request.json();

  const validation = workoutSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  if (await prisma.block.findUnique({ where: { name: body.name } })) {
    return NextResponse.json(
      { error: "Workout already exists." },
      { status: 400 }
    );
  }

  const duplicatedExercises = await prisma.exercise.findMany({
    where: {
      name: { in: body.exercises.filter((e) => !e?.id).map((e) => e.name) },
    },
  });
  if (duplicatedExercises.length > 0) {
    return NextResponse.json(
      {
        error: `Some of the exercises already exist: ${duplicatedExercises
          .map((e) => e.name)
          .join(", ")}`,
      },
      { status: 400 }
    );
  }

  const block = await prisma.block.create({
    data: {
      name: body.name,
      description: body.description,
      exercises: {
        create: body.exercises.map((exercise) => ({
          type: exercise.type,
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

  return NextResponse.json(block);
}
