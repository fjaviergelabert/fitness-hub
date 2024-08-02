import { withProtectedRoute } from "@/app/components/Authorize/WithProtectedRoute";
import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { createWorkout } from "../_actions";
import { WorkoutForm } from "../_components/WorkoutForm";

const Page = async () => {
  const exercises = await prisma.exercise.findMany();

  return (
    <>
      <Heading as="h1"> Create your own workout.</Heading>
      <WorkoutForm exercises={exercises} onSubmit={createWorkout} />
    </>
  );
};

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(Page);
