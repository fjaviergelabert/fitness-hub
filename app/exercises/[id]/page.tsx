import { withProtectedRoute } from "@/app/_shared/components/Authorize/WithProtectedRoute";
import prisma from "@/prisma/client";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditForm } from "../../_shared/components/ExerciseForm";

async function EditExercise({ params: { id } }: { params: { id: string } }) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
  });

  if (!exercise) {
    notFound();
  }

  return (
    <>
      <Flex justify={"center"} asChild>
        <Heading as="h1">Edit Exercise</Heading>
      </Flex>
      <Section>
        <EditForm exercise={exercise} />
      </Section>
    </>
  );
}

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(EditExercise);
