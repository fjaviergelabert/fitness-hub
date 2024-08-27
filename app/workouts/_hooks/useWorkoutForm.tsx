"use client";
import { getWorkout } from "@/app/workouts/_actions";
import { Workout, WorkoutExercise, workoutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise, ExerciseType } from "@prisma/client";
import { useForm } from "react-hook-form";

export function useWorkoutForm(
  workout?: NonNullable<Awaited<ReturnType<typeof getWorkout>>>
) {
  const form = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: workout || {
      name: "",
      description: "",
      exercises: [],
    },
  });
  const { setValue, getValues } = form;
  const workoutExercises = getValues("exercises");

  const addExercise = (exercise: Exercise) =>
    setValue(
      "exercises",
      [
        ...workoutExercises,
        {
          ...exercise,
          orderId: workoutExercises.length + 1,
          type: "NONE",
          exerciseId: exercise.id,
          id: 0,
        },
      ],
      {
        shouldValidate: true,
      }
    );

  const updateExerciseType = (
    exercise: WorkoutExercise,
    type: ExerciseType
  ) => {
    setValue(
      "exercises",
      workoutExercises.map((e) =>
        e.orderId === exercise.orderId ? { ...e, type } : e
      ) as typeof workoutExercises,
      {
        shouldValidate: true,
      }
    );
  };

  const removeExercise = (exercise: WorkoutExercise) => {
    form.setValue(
      "exercises",
      workoutExercises
        .filter((e) => e.orderId !== exercise.orderId)
        .map((e, idx) => ({
          ...e,
          orderId: idx + 1,
        })) as typeof workoutExercises,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const decrementOrder = (exercise: WorkoutExercise, index: number) => {
    const previousExercise = { ...workoutExercises[index - 1] };
    const newValue = workoutExercises.map((_exercise, _index) => {
      if (_index === index - 1) {
        return { ...exercise, orderId: previousExercise.orderId };
      }
      if (_index === index) {
        return { ...previousExercise, orderId: exercise.orderId };
      }
      return _exercise;
    });
    setValue("exercises", newValue as typeof workoutExercises, {
      shouldValidate: true,
    });
  };

  const incrementOrder = (exercise: WorkoutExercise, index: number) => {
    const nextExercise = { ...workoutExercises[index + 1] };
    const newValue = workoutExercises.map((_exercise, _index) => {
      if (_index === index + 1) {
        return { ...exercise, orderId: nextExercise.orderId };
      }
      if (_index === index) {
        return { ...nextExercise, orderId: exercise.orderId };
      }
      return _exercise;
    });
    setValue("exercises", newValue as typeof workoutExercises, {
      shouldValidate: true,
    });
  };

  return {
    form,
    actions: {
      addExercise,
      updateExerciseType,
      removeExercise,
      decrementOrder,
      incrementOrder,
    },
  };
}
