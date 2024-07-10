"use client";
import { useFormMutation } from "@/app/hooks/useMutation";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";
import { createExercise, updateExercise } from "../exercises/_actions";

export function EditForm(props: { exercise: Exercise }) {
  const form = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: props.exercise,
  });
  const exerciseMutation = useFormMutation<any, Exercise>(
    updateExercise,
    "/exercises",
    form
  );

  return (
    <ExerciseForm
      exercise={props.exercise}
      form={form}
      onSubmit={(exercise) => {
        exerciseMutation.mutate({ ...exercise, id: props.exercise.id });
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

export function CreateForm() {
  const form = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      mediaUrl: "",
    },
  });
  const exerciseMutation = useFormMutation<any, Exercise>(
    createExercise,
    "/exercises",
    form
  );

  return (
    <ExerciseForm
      form={form}
      onSubmit={(exercise) => {
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
  buttonSection,
  onSubmit,
  form,
}: {
  exercise?: Exercise;
  buttonSection: ReactNode;
  onSubmit: (e: Exercise) => void;
  form: UseFormReturn<Exercise>;
}) {
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

            <Callout.Text>
              The form is not valid.{" "}
              {errors.root?.serverError &&
                `Server Error: ${errors.root?.serverError.message}`}
            </Callout.Text>
          </Callout.Root>
        )}
        <fieldset className="max-w-sm">
          <Text as="label">
            Exercise Name
            <TextField.Root {...register("name")} />
          </Text>
          {errors.name && <Text color="crimson">{errors.name?.message}</Text>}
        </fieldset>
        <fieldset className="max-w-sm">
          <Text as="label">
            Image URL
            <Link
              className="text-red-300 hover:text-red-500"
              href="https://unsplash.com/s/photos/fitness"
              rel="noopener noreferrer"
              target="_blank"
            >
              {' (Only "unsplash" available)'}
            </Link>
            <TextField.Root {...register("mediaUrl")} />
          </Text>
          {errors.mediaUrl && (
            <Text color="crimson">{errors.mediaUrl?.message}</Text>
          )}
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
