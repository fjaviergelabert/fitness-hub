"use client";
import { useMutation } from "@/app/hooks/useMutation";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { MutationFunction } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";

export function EditForm(props: { exercise: Exercise }) {
  return (
    <ExerciseForm
      onSubmit={(exercise: Exercise) => {
        return axios
          .put("/api/exercises/" + props.exercise.id, exercise)
          .then((res) => res.data);
      }}
      {...props}
    />
  );
}

export function CreateForm() {
  return (
    <ExerciseForm
      onSubmit={(exercise: Exercise) => {
        return axios.post("/api/exercises", exercise).then((res) => res.data);
      }}
    />
  );
}

export function ExerciseForm({
  exercise,
  onSubmit,
}: {
  exercise?: Exercise;
  onSubmit: MutationFunction<Exercise, Exercise>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: exercise || {
      id: 0,
      name: "",
      description: "",
      mediaUrl: "",
    },
  });
  const exerciseMutation = useMutation(onSubmit, "/exercises");
  return (
    <form
      onSubmit={handleSubmit((formValues) => {
        if (isValid) {
          exerciseMutation.mutate(formValues);
        }
      })}
      className="flex flex-col gap-3 max-w-screen-lg"
    >
      {isSubmitted && !isValid && (
        <Callout.Root color="crimson">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>The form is not valid.</Callout.Text>
        </Callout.Root>
      )}
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
      <Button
        className="self-end"
        type="submit"
        disabled={exerciseMutation.isPending}
      >
        SAVE
        {exerciseMutation.isPending && (
          <AiOutlineLoading className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
