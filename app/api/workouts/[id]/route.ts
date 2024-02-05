import prisma from "@/prisma/client";
import { Workout, workoutSchema } from "@/schemas/exercise";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const workout = await prisma.block.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(workout);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body: Workout = await request.json();

  const validation = workoutSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const workout = await prisma.block.findUnique({
    where: { id: Number(id) },
  });
  if (!workout) {
    return NextResponse.json({ error: "Workout not found." }, { status: 404 });
  }

  const isSameName = workout.name === body.name;
  if (
    !isSameName &&
    (await prisma.block.findUnique({ where: { name: body.name } }))
  ) {
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

  await prisma.blockExercise.deleteMany({ where: { blockId: Number(id) } });
  const block = await prisma.block.update({
    where: { id: Number(id) },
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
