import { Exercise } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { exerciseSchema } from "./app/api/exercises/route";

export const validateSchema =
  (schema: ZodSchema) =>
  async (request: NextRequest, response: NextResponse) => {
    const body: Exercise = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    NextResponse.next();
  };

export function middleware(request: NextRequest, response: NextResponse) {
  // ! TODO: FIX MIDDLEWARE
  console.log("NOT RUNNING");
  if (request.nextUrl.pathname.startsWith("/exercises")) {
    validateSchema(exerciseSchema)(request, response);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
