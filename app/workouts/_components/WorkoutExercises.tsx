"use client";
import { Workout } from "@/schemas/exercise";
import { UseFormReturn } from "react-hook-form";
import { ExerciseCard } from "./ExerciseCard";
import { RemoveButton } from "./RemoveButton";

export function WorkoutExercises({ form }: { form: UseFormReturn<Workout> }) {
  const { getValues, setValue } = form;
  const exercises = getValues("exercises");

  if (exercises.length === 0) {
    return null;
  }

  return exercises.map((exercise) => (
    <ExerciseCard
      key={exercise.id}
      exercise={exercise}
      onSelect={(type) => {
        // TODO: Fix type issue
        const newValue: any = exercises.map((e) =>
          e.id === exercise.id ? { ...e, type } : e
        );
        setValue("exercises", newValue, { shouldValidate: true });
      }}
      buttonsSection={
        <RemoveButton
          onClick={() => {
            // TODO: Fix type issue
            const newValue: any = exercises.filter((e) =>
              e.id ? e.id !== exercise.id : e.name !== exercise.name
            );
            form.setValue("exercises", newValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      }
    />
  ));
}
