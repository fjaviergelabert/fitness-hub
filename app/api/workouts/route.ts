import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const workouts = await prisma.block.findMany({
    include: { exercises: true },
  });
  return NextResponse.json(workouts);
}
