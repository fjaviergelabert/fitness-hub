"use client";
import { Exercise } from "@prisma/client";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import { ExerciseForm } from "../components/ExerciseForm";

export default function NewExercise() {
  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <ExerciseForm
        mutationFn={(exercise: Exercise) =>
          axios.post("/api/exercises", exercise).then((res) => res.data)
        }
      />
    </>
  );
}
