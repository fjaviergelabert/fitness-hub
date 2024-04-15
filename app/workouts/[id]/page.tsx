import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditWorkoutForm } from "../_components/WorkoutForm";

export default async function EditWorkout({
  params: { id },
}: {
  params: { id: string };
}) {
  const exercises = await prisma.exercise.findMany();
  const dbWorkout = await prisma.block.findUnique({
    where: { id: Number(id) },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!dbWorkout) {
    notFound();
  }

  if (exercises.length === 0) {
    return <p>No exercises found</p>;
  }

  // TODO: Fix type prisma issue
  const workout: any = {
    ...dbWorkout,
    exercises: dbWorkout.exercises.map((e) => ({
      type: e.type,
      ...e.exercise,
    })),
  };

  return (
    <>
      <Heading as="h1">Workout</Heading>
      <EditWorkoutForm workout={workout} exercises={exercises} />
    </>
  );
}
