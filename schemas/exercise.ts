import { ExerciseType } from "@prisma/client";
import { z } from "zod";

const _exerciseSchema = {
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  mediaUrl: z.string().max(255).optional().nullable(),
};

export const exerciseSchema = z.object(_exerciseSchema);
export const updateExerciseSchema = z.object({
  ..._exerciseSchema,
  id: z.number().min(1),
});

export const workoutExerciseSchema = exerciseSchema.extend({
  id: z.number().optional().nullable(),
  type: z.nativeEnum(ExerciseType),
  orderId: z.number(),
});

const _workoutSchema = {
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
};

export const workoutSchema = z.object(_workoutSchema);

export const updateWorkoutSchema = z.object({
  ..._workoutSchema,
  id: z.number().min(1),
});

export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
