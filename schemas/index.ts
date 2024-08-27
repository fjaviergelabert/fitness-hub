import { ExerciseType } from "@prisma/client";
import { z } from "zod";

const unsplashUrlPattern = /^(https:\/\/[a-zA-Z0-9-]+\.unsplash\.com\/.*)?$/;
const unsplashUrlSchema = z
  .string()
  .url()
  .regex(unsplashUrlPattern, {
    message: "URL must be part of 'https://XXXX.unsplash.com'",
  })
  .optional()
  .or(z.literal(""));

const _exerciseSchema = {
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  mediaUrl: unsplashUrlSchema,
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
  exerciseId: z.number().optional().nullable(),
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

export const profileSchema = z.object({
  image: unsplashUrlSchema,
  name: z.string().min(3).max(150).optional(),
});

const userWorkoutExerciseSchema = z.object({
  id: z.number().int().optional(),
  notes: z.string().optional(),
  reps: z.number().int().nonnegative().optional(),
  weight: z.number().int().nonnegative().optional(),
  time: z.number().int().nonnegative().optional(),
  workoutExerciseId: z.number().int(),
});

export const userWorkoutSchema = z.object({
  id: z.number().int().optional(),
  workoutId: z.number().int(),
  // userId: z.string(),
  duration: z.number(),
  exercises: z.array(userWorkoutExerciseSchema),
});

export type UserWorkoutSchema = z.infer<typeof userWorkoutSchema>;
