"use client";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";

function Exercises() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Exercise>({ resolver: zodResolver(exerciseSchema) });
  const exercise = useMutation({
    mutationFn: async (exercise: Exercise) =>
      await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      }),
  });

  async function createExercise(formValues: FieldValues) {
    exercise.mutate(formValues as Exercise);
  }

  return (
    <>
      <h1>Create Exercise</h1>
      <form
        onSubmit={handleSubmit(createExercise)}
        className="flex flex-col gap-3"
      >
        <fieldset className="max-w-sm">
          <label>
            Exercise Name
            <TextField.Input {...register("name")} />
          </label>
          {errors.name && <p role="alert">{errors.name?.message}</p>}
        </fieldset>
        <fieldset>
          <label>
            Description
            <TextArea {...register("description")} />
          </label>
        </fieldset>
        <Button type="submit">CREATE</Button>
      </form>
    </>
  );
}

export default Exercises;
