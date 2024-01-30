"use client";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";
import { toast } from "react-toastify";

export function EditForm(props: { exercise: Exercise }) {
  return (
    <ExerciseForm
      mutationFn={(exercise: Exercise) => {
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
      mutationFn={(exercise: Exercise) => {
        return axios.post("/api/exercises", exercise).then((res) => res.data);
      }}
    />
  );
}

export function ExerciseForm({
  exercise,
  mutationFn,
}: {
  exercise?: Exercise;
  mutationFn: MutationFunction<any, Exercise>;
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
  const exerciseMutation = useExerciseMutation(mutationFn);
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
      <Button type="submit" disabled={exerciseMutation.isPending}>
        CREATE
        {exerciseMutation.isPending && (
          <AiOutlineLoading className="animate-spin" />
        )}
      </Button>
    </form>
  );
}

function useExerciseMutation(mutationFn: MutationFunction<any, Exercise>) {
  const router = useRouter();
  return useMutation({
    mutationFn,
    onError: async (e: AxiosError<{ error: string }>) => {
      if ((e.status = 400)) {
        toast.warning(e.response?.data.error, {
          theme: "colored",
        });
      } else {
        toast.error("An error ocurred.", {
          theme: "colored",
        });
      }
    },
    onSuccess: async () => {
      toast.success("TRRRRRansaction completed", { theme: "colored" });
      router.push("/exercises");
      router.refresh();
    },
  });
}
