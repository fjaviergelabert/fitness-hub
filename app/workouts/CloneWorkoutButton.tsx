"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { cloneWorkout } from "./_actions";

export function CloneWorkoutButton({ workoutId }: { workoutId: number }) {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await cloneWorkout(workoutId);
        router.push("/workouts", { scroll: false });
        router.refresh();
      }}
      variant="solid"
      color="cyan"
    >
      Clone
    </Button>
  );
}
