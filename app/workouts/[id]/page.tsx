import { withProtectedRoute } from "@/app/_shared/components/Authorize/WithProtectedRoute";
import { getWorkout, updateWorkout } from "@/app/workouts/_actions";
import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { WorkoutForm } from "../_components/WorkoutForm";

async function Page({ params: { id } }: { params: { id: string } }) {
  const exercises = await prisma.exercise.findMany();
  const workout = await getWorkout(Number(id));

  if (!workout) {
    notFound();
  }

  if (exercises.length === 0) {
    return <p>No exercises found</p>;
  }

  return (
    <>
      <Heading as="h1">Workout</Heading>
      <WorkoutForm
        workout={workout}
        exercises={exercises}
        onSubmit={updateWorkout}
      />
    </>
  );
}

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(Page);
