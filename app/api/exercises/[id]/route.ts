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