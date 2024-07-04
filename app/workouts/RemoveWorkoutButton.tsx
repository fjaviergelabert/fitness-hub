"use client";
import { useRouter } from "next/navigation";
import { deleteWorkout } from "./_actions";
import { RemoveButton } from "./_components/RemoveButton";

export function RemoveWorkoutButton({ workoutId }: { workoutId: number }) {
  const router = useRouter();
  return (
    <RemoveButton
      onClick={async () => {
        await deleteWorkout(workoutId);
        router.push("/workouts", { scroll: false });
        router.refresh();
      }}
    />
  );
}
