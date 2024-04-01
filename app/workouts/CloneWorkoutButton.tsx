"use client";

import { useMutation } from "@/app/hooks/useMutation";
import { Workout } from "@/schemas/exercise";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { PrismaWorkout } from "./page";

export function CloneWorkoutButton({ workout }: { workout: PrismaWorkout }) {
  const workoutMutation = useMutation<Workout>((workout: Workout) => {
    return axios.post("/api/workouts", workout).then((res) => res.data);
  }, "/workouts");

  const onClick = () => {
    // TODO FIX THIS TYPE
    const cloneWorkout: any = {
      id: 0,
      name: workout.name + " Copy",
      description: workout.description,
      exercises: workout.exercises.map((e) => ({
        ...e.exercise,
        type: e.type,
      })),
    };
    workoutMutation.mutate(cloneWorkout);
  };

  return (
    <Button onClick={onClick} variant="solid" color="cyan">
      Clone
    </Button>
  );
}
