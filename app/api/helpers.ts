import { BlockExercise, Exercise } from "@prisma/client";

export function flattenExercise(
  exercise: BlockExercise & { exercise: Exercise }
) {
  return {
    type: exercise.type,
    orderId: exercise.orderId,
    ...exercise.exercise,
  };
}
