import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { createWorkout } from "../_actions";
import { WorkoutForm } from "../_components/WorkoutForm";

const Page = async () => {
  const exercises = await prisma.exercise.findMany();

  if (exercises.length === 0) {
    return <p>No exercises found</p>;
  }

  return (
    <>
      <Heading as="h1"> Create your own workout.</Heading>
      <WorkoutForm exercises={exercises} onSubmit={createWorkout} />
    </>
  );
};

export default Page;
