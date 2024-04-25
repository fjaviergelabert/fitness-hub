import prisma from "@/prisma/client";
import { getWorkout } from "@/prisma/queries";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditWorkoutForm } from "../_components/WorkoutForm";

export default async function EditWorkout({
  params: { id },
}: {
  params: { id: string };
}) {
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
      <EditWorkoutForm workout={workout} exercises={exercises} />
    </>
  );
}
