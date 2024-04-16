import { ExerciseType } from "@prisma/client";
import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  mediaUrl: z.string().max(255).optional().nullable(),
});

export const workoutExerciseSchema = exerciseSchema.extend({
  id: z.number().optional().nullable(),
  type: z.nativeEnum(ExerciseType),
  orderId: z.number(),
});

export const workoutSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  exercises: z
    .array(workoutExerciseSchema)
    .nonempty({
      message: "Exercises need to be added to the workout.",
    })
    .refine((exercises) => {
      const orderIds = exercises.map((e) => e.orderId);
      const duplicates = orderIds.filter((item, index) =>
        orderIds.some((elem, idx) => elem === item && idx !== index)
      );
      return duplicates.length === 0;
    }, "The order of exercises is incorrect"),
});

export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
