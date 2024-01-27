"use client";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

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
    formState: { errors, isValid },
  } = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: exercise || {},
  });
  const exerciseCreate = useExerciseMutation(mutationFn);
  return (
    <form
      onSubmit={handleSubmit((formValues) => exerciseCreate.mutate(formValues))}
      className="flex flex-col gap-3 max-w-screen-lg"
    >
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
      <Button type="submit" disabled={exerciseCreate.isPending || !isValid}>
        CREATE
        {exerciseCreate.isPending && (
          <AiOutlineLoading className="animate-spin" />
        )}
      </Button>
    </form>
  );
}

function useExerciseMutation(mutationFn: MutationFunction<any, Exercise>) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
}
