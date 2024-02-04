"use client";

import { Workout, workoutSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseMenu } from "./ExerciseMenu";
import { RemoveExerciseButton } from "./RemoveExerciseButton";

export function CreateWorkoutForm(props: { exercises: Exercise[] }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      description: "",
      exercises: [],
    },
  });
  const formExercises = getValues("exercises");

  function createWorkout(workout: Workout) {
    axios.post("/api/workouts", workout).then((res) => res.data);
    router.push("/workouts");
    router.refresh();
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((formValues) => {
        if (isValid) {
          createWorkout(formValues);
        }
      })}
    >
      <ExerciseMenu
        exercises={props.exercises.filter(
          (e) => !formExercises.some((fe) => fe.id === e.id)
        )}
        onSelect={(exercise) =>
          setValue("exercises", [...formExercises, exercise], {
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
        {formExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onSelect={(type) => {
              const newValue: any = formExercises.map((e) =>
                e.id === exercise.id ? { ...e, type } : e
              );
              setValue("exercises", newValue);
            }}
            buttonsSection={
              <RemoveExerciseButton
                onClick={() => {
                  const newValue: any = formExercises.filter((e) =>
                    e.id ? e.id !== exercise.id : e.name !== exercise.name
                  );
                  setValue("exercises", newValue);
                }}
              />
            }
          />
        ))}
        {errors.exercises && (
          <Text color="crimson">{errors.exercises?.message}</Text>
        )}
      </fieldset>
      <Button type="submit">Save</Button>
    </form>
  );
}
