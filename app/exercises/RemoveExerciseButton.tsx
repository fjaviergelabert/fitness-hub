"use client";
import { useToastMutation } from "../_shared/hooks/useMutation";
import { RemoveButton } from "../workouts/_components/RemoveButton";
import { deleteExercise } from "./_actions";

export function RemoveExerciseButton({ exerciseId }: { exerciseId: number }) {
  const exerciseMutation = useToastMutation<any, number>(
    deleteExercise,
    "/exercises"
  );
  return (
    <RemoveButton
      onClick={async () => {
        exerciseMutation.mutate(exerciseId);
      }}
    />
  );
}
