"use client";
import { useMutation } from "@/app/hooks/useMutation";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";

export function EditForm(props: { exercise: Exercise }) {
  const exerciseMutation = useMutation((exercise: Exercise) => {
    return axios
      .put("/api/exercises/" + props.exercise.id, exercise)
      .then((res) => res.data);
  }, "/exercises");

  return (
    <ExerciseForm
      onSubmit={(exercise: Exercise) => {
        exerciseMutation.mutate(exercise);
      }}
      {...props}
      buttonSection={
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
      }
    />
  );
}

export function CreateForm() {
  const exerciseMutation = useMutation((exercise: Exercise) => {
    return axios.post("/api/exercises", exercise).then((res) => res.data);
  }, "/exercises");

  return (
    <ExerciseForm
      onSubmit={(exercise: Exercise) => {
        exerciseMutation.mutate(exercise);
      }}
      buttonSection={
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
      }
    />
  );
}

export function ExerciseForm({
  exercise,
  buttonSection,
  onSubmit,
}: {
  exercise?: Exercise;
  buttonSection: ReactNode;
  onSubmit: (e: Exercise) => void;
}) {
  const form = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: exercise || {
      id: 0,
      name: "",
      description: "",
      mediaUrl: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        {buttonSection}
      </form>
    </FormProvider>
  );
}
