import { Heading } from "@radix-ui/themes";
import { CreateForm } from "../_components/ExerciseForm";

export default async function NewExercise() {
  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <CreateForm />
    </>
  );
}
