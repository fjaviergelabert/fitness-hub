import { withProtectedRoute } from "@/app/components/Authorize/WithProtectedRoute";
import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditForm } from "../../components/ExerciseForm";

async function EditExercise({ params: { id } }: { params: { id: string } }) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
  });

  if (!exercise) {
    notFound();
  }

  return (
    <>
      <Heading as="h1">Edit Exercise</Heading>
      <EditForm exercise={exercise} />
    </>
  );
}

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(EditExercise);
