"use client";

import { Workout, workoutSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ExerciseMenu } from "./ExerciseMenu";
import { WorkoutExercises } from "./WorkoutExercises";

// TODO: Add loading states
// TODO: Add skeletons

// ! TODO: test "permanentRedirect"
export function EditWorkoutForm(props: {
  workout: Workout;
  exercises: Exercise[];
}) {
  const router = useRouter();

  return (
    <WorkoutForm
      onSubmit={(workout: Workout) => {
        axios
          .put("/api/workouts/" + props.workout.id, workout)
          .then((res) => res.data);
        router.push("/workouts");
        router.refresh();
      }}
      {...props}
    />
  );
}

export function CreateWorkoutForm(props: { exercises: Exercise[] }) {
  const router = useRouter();

  return (
    <WorkoutForm
      onSubmit={(workout: Workout) => {
        axios.post("/api/workouts", workout).then((res) => res.data);
        router.push("/workouts");
        router.refresh();
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
  onSubmit: (formValues: Workout) => void;
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
    formState: { errors, isValid },
  } = form;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((formValues) => {
        if (isValid) {
          onSubmit(formValues);
        }
      })}
    >
      {!isValid && (
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

      <Button type="submit" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
}
