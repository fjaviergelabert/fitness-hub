"use client";

import { useToastMutation } from "@/app/_shared/hooks/useMutation";
import { getWorkout } from "@/app/workouts/_actions";
import { UserWorkoutSchema } from "@/schemas";
import { Box, Button, Text } from "@radix-ui/themes";
import { createUserWorkout } from "../../_actions";

export function CompleteWorkoutButton({
  workout,
}: {
  workout: Awaited<ReturnType<typeof getWorkout>>;
}) {
  const mutation = useToastMutation<any, UserWorkoutSchema>(
    createUserWorkout,
    "/dashboard"
  );

  function createWorkout() {
    mutation.mutate({
      workoutId: workout?.id!,
      exercises: workout?.exercises.map((e) => {
        return {
          notes: "",
          reps: 0,
          time: 0,
          weight: 0,
          workoutExerciseId: e.id,
        };
      })!,
    });
  }

  return (
    <Box className="animate-bounce">
      <Button
        onClick={createWorkout}
        color="grass"
        asChild
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        <Text className="animate-pulse">{"COMPLETE"}</Text>
      </Button>
    </Box>
  );
}
