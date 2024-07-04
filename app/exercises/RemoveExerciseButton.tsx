"use client";
import { useRouter } from "next/navigation";
import { RemoveButton } from "../workouts/_components/RemoveButton";
import { deleteExercise } from "./_actions";

export function RemoveExerciseButton({ exerciseId }: { exerciseId: number }) {
  const router = useRouter();
  return (
    <RemoveButton
      onClick={async () => {
        await deleteExercise(exerciseId);
        router.push("/exercises", { scroll: false });
        router.refresh();
      }}
    />
  );
}
