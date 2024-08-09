"use client";
import { useToastMutation } from "../_shared/hooks/useMutation";
import { deleteWorkout } from "./_actions";
import { RemoveButton } from "./_components/RemoveButton";

export function RemoveWorkoutButton({ workoutId }: { workoutId: number }) {
  const workoutMutation = useToastMutation<any, number>(
    deleteWorkout,
    "/workouts"
  );
  return (
    <RemoveButton
      onClick={async () => {
        workoutMutation.mutate(workoutId);
      }}
    />
  );
}
