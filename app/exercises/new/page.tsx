"use client";
import { exerciseSchema } from "@/schemas/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { Button, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

function Exercises() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Exercise>({ resolver: zodResolver(exerciseSchema) });
  const queryClient = useQueryClient();
  const exercise = useMutation({
    mutationFn: (exercise: Exercise) =>
      axios.post("/api/exercises", exercise).then((res) => res.data),
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

  async function createExercise(formValues: FieldValues) {
    exercise.mutate(formValues as Exercise);
  }

  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <form
        onSubmit={handleSubmit(createExercise)}
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
        <Button type="submit" disabled={exercise.isPending || !isValid}>
          CREATE
          {exercise.isPending && <AiOutlineLoading className="animate-spin" />}
        </Button>
      </form>
    </>
  );
}

export default Exercises;
