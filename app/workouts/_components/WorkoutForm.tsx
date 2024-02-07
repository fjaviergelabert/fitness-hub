"use client";

import { useMutation } from "@/app/hooks/useMutation";
import { Workout, workoutSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import { MutationFunction } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { ExerciseMenu } from "./ExerciseMenu";
import { WorkoutExercises } from "./WorkoutExercises";

// TODO: Add loading states
// TODO: Add skeletons

export function EditWorkoutForm(props: {
  workout: Workout;
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
  workout?: Workout;
  exercises: Exercise[];
  onSubmit: MutationFunction<Workout, Workout>;
}) {
  const form = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: workout || {
      name: "",
      description: "",
      exercises: [],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitted },
  } = form;

  const workoutMutation = useMutation<Workout>(onSubmit, "/workouts");

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
        <Heading
          size={"4"}
          align={"center"}
          color="crimson"
        >{`Errors found`}</Heading>
      )}

      <ExerciseMenu
        exercises={exercises.filter(
          (e) => !getValues("exercises").some((fe) => fe.id === e.id)
        )}
        onSelect={(exercise) =>
          setValue("exercises", [...getValues("exercises"), exercise], {
            shouldValidate: true,
          })
        }
      />

      <fieldset className="max-w-sm">
        <Text as="label">
          Exercise Name
          <TextField.Input {...register("name")} />
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
        <Heading as="h3">Exercises: </Heading>
        <WorkoutExercises form={form} />
        {errors.exercises && (
          <Text color="crimson">{errors.exercises?.message}</Text>
        )}
      </fieldset>

      <Button type="submit" disabled={workoutMutation.isPending}>
        SAVE
        {workoutMutation.isPending && (
          <AiOutlineLoading className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
