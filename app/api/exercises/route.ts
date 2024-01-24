import prisma from "@/prisma/client";
import { Exercise } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().optional(),
  mediaUrl: z.string().max(255).optional(),
});

export async function GET() {
  const exercises = await prisma.exercise.findMany();
  return NextResponse.json(exercises);
}

export async function POST(request: NextRequest) {
  const body: Exercise = await request.json();

  const validation = exerciseSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  if (await prisma.exercise.findUnique({ where: { name: body.name } })) {
    return NextResponse.json(
      { error: "Exercise already exists." },
      { status: 400 }
    );
  }

  const exercise = await prisma.exercise.create({
    data: {
      name: body.name,
      description: body.description,
      mediaUrl: body.mediaUrl,
    },
  });

  return NextResponse.json(exercise);
}
