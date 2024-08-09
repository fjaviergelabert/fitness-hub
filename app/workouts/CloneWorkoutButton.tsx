"use client";

import { Button } from "@radix-ui/themes";
import { useToastMutation } from "../_shared/hooks/useMutation";
import { cloneWorkout } from "./_actions";

export function CloneWorkoutButton({ workoutId }: { workoutId: number }) {
  const workoutMutation = useToastMutation<any, number>(
    cloneWorkout,
    "/workouts"
  );

  return (
    <Button
      onClick={async () => {
        workoutMutation.mutate(workoutId);
      }}
      variant="solid"
      color="cyan"
    >
      Clone
    </Button>
  );
}
