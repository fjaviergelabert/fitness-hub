import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { CreateWorkoutForm } from "./CreateWorkoutForm";

const Page = async () => {
  const exercises = await prisma.exercise.findMany();

  if (exercises.length === 0) {
    return <p>No exercises found</p>;
  }

  return (
    <>
      <Heading as="h1"> Create your own workout.</Heading>
      <CreateWorkoutForm exercises={exercises} />
    </>
  );
};

export default Page;
