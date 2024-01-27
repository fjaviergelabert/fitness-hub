"use client";
import { Exercise } from "@prisma/client";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import { ExerciseForm } from "../components/ExerciseForm";

export default async function EditExercise({
  params: { id },
}: {
  params: { id: string };
}) {
  const response = await axios.get<Exercise>("/api/exercises/" + id);
  return (
    <>
      <Heading as="h1">Edit Exercise</Heading>
      <ExerciseForm
        exercise={response.data}
        mutationFn={(exercise: Exercise) =>
          axios.put("/api/exercises/" + id, exercise).then((res) => res.data)
        }
      />
    </>
  );
}
