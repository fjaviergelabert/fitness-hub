"use client";
import axios from "axios";
import { useMutation } from "../hooks/useMutation";
import { RemoveButton } from "./_components/RemoveButton";

export function RemoveWorkoutButton({ workoutId }: { workoutId: number }) {
  const mutation = useMutation((id: number) => {
    return axios.delete("/api/workouts/" + id).then((res) => res.data);
  }, "/workouts");
  return (
    <RemoveButton
      onClick={() => {
        mutation.mutate(workoutId);
      }}
    />
  );
}
