"use client";

import { useMutation } from "@/app/hooks/useMutation";
import { getWorkout } from "@/app/workouts/_actions/queries";
import { Workout } from "@/schemas/exercise";
import { Exercise } from "@prisma/client";
import {
  Box,
  Button,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { MutationFunction } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { useWorkoutForm } from "../_hooks/useWorkoutForm";
import { ExerciseDialog } from "./ExerciseDialog";
import { ExerciseMenu } from "./ExerciseMenu";
import { WorkoutExercises } from "./WorkoutExercises";

// TODO: Add loading states
// TODO: Add skeletons

export function EditWorkoutForm(props: {
  workout: NonNullable<Awaited<ReturnType<typeof getWorkout>>>;
  exercises: Exercise[];
}) {
  return (
    <WorkoutForm
      onSubmit={(workout: Workout) => {
        return axios
          .put("/api/workouts/" + props.workout.id, workout)
          .then((res) => res.data);
      }}
      {...props}
    />
  );
}

export function CreateWorkoutForm(props: { exercises: Exercise[] }) {
  return (
    <WorkoutForm
      onSubmit={(workout: Workout) => {
        return axios.post("/api/workouts", workout).then((res) => res.data);
      }}
      {...props}
    />
  );
}

export function WorkoutForm({
  workout,
  exercises,
  onSubmit,
}: {
  workout?: NonNullable<Awaited<ReturnType<typeof getWorkout>>>;
  exercises: Exercise[];
  onSubmit: MutationFunction<Workout, Workout>;
}) {
  const workoutMutation = useMutation<Workout>(onSubmit, "/workouts");

  const {
    form: {
      getValues,
      register,
      handleSubmit,
      formState: { errors, isValid, isSubmitted },
    },
    actions: {
      addExercise,
      updateExerciseType,
      removeExercise,
      decrementOrder,
      incrementOrder,
    },
  } = useWorkoutForm(workout);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((formValues) => {
        if (isValid) {
          workoutMutation.mutate(formValues);
        }
      })}
    >
      {isSubmitted && !isValid && (
        <Heading size={"4"} align={"center"} color="crimson">
          Errors found
        </Heading>
      )}

      <fieldset className="max-w-sm">
        <Text as="label">
          Workout Name
          <TextField.Root {...register("name")} />
        </Text>
        {errors.name && <Text color="crimson">{errors.name?.message}</Text>}
      </fieldset>

      <fieldset>
        <Text as="label">
          Description
          <TextArea {...register("description")} />
        </Text>
        {errors.description && (
          <Text color="crimson">{errors.description?.message}</Text>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <Heading as="h3">Exercises:</Heading>
        <Box>
          <ExerciseDialog onSubmit={addExercise} />
          {exercises.length > 0 && (
            <ExerciseMenu exercises={exercises} onSelect={addExercise} />
          )}
        </Box>
        <WorkoutExercises
          exercises={getValues("exercises")}
          onTypeSelect={updateExerciseType}
          onRemoveClick={removeExercise}
          onDecrementOrder={decrementOrder}
          onIncrementOrder={incrementOrder}
        />
        {errors.exercises && (
          <Text color="crimson">{errors.exercises?.message}</Text>
        )}
      </fieldset>

      <Button
        className="self-end"
        type="submit"
        disabled={workoutMutation.isPending}
      >
        SAVE
        {workoutMutation.isPending && (
          <AiOutlineLoading className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
