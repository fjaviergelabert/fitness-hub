import prisma from "@/prisma/client";
import { exerciseSchema } from "@/schemas/exercise";
import { Exercise } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(exercise);
}

export async function DELETE(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const workouts = await prisma.blockExercise.findMany({
    where: { exerciseId: Number(id) },
  });
  if (workouts.length > 0) {
    return NextResponse.json(
      { error: "Exercise is being used in a workout." },
      { status: 400 }
    );
  }

  await prisma.exercise.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({});
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: Exercise = await request.json();
  const exerciseId = Number(params.id);

  const validation = exerciseSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exercise) {
    return NextResponse.json({ error: "Exercise not found." }, { status: 404 });
  }

  const newExercise = await prisma.exercise.update({
    where: { id: exerciseId },
    data: {
      name: body.name,
      description: body.description,
      mediaUrl: body.mediaUrl,
    },
  });

  return NextResponse.json(newExercise);
}
