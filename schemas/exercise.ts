import { ExerciseType } from "@prisma/client";
import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  mediaUrl: z.string().max(255).optional().nullable(),
});

export const workoutExerciseSchema = exerciseSchema.extend({
  id: z.number().optional().nullable(),
  type: z.nativeEnum(ExerciseType).optional(),
});

export const workoutSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  exercises: z.array(workoutExerciseSchema).nonempty({
    message: "Exercises need to be added to the workout.",
  }),
});

export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
