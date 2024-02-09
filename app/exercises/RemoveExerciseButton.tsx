"use client";
import axios from "axios";
import { useMutation } from "../hooks/useMutation";
import { RemoveButton } from "../workouts/_components/RemoveButton";

export function RemoveExerciseButton({ exerciseId }: { exerciseId: number }) {
  const mutation = useMutation((id: number) => {
    return axios.delete("/api/exercises/" + id).then((res) => res.data);
  }, "/exercises");
  return (
    <RemoveButton
      onClick={() => {
        mutation.mutate(exerciseId);
      }}
    />
  );
}
