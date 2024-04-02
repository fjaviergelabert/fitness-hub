"use client";

import { useMutation } from "@/app/hooks/useMutation";
import { Button } from "@radix-ui/themes";
import axios from "axios";

export function CloneWorkoutButton({ workoutId }: { workoutId: number }) {
  const workoutMutation = useMutation((id: number) => {
    return axios.get(`/api/workouts/${id}/clone`).then((res) => res.data);
  }, "/workouts");

  const onClick = () => {
    workoutMutation.mutate(workoutId);
  };

  return (
    <Button onClick={onClick} variant="solid" color="cyan">
      Clone
    </Button>
  );
}
