import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { flattenExercise } from "../../helpers";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const workout = await prisma.block.findUnique({
    where: { id: Number(id) },
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

  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...workout,
    exercises: workout.exercises.map(flattenExercise),
  });
}

export async function DELETE(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.$transaction([
    prisma.blockExercise.deleteMany({
      where: { blockId: Number(id) },
    }),
    prisma.block.delete({
      where: { id: Number(id) },
    }),
  ]);
  return NextResponse.json({});
}
