import prisma from "@/prisma/client";
import { Flex, Section } from "@radix-ui/themes";
import ExerciseTable from "./ExerciseTable";
import { ExercisesHeading } from "./ExercisesHeading";

async function Exercises() {
  const exercises = await prisma.exercise.findMany();
  return exercises.length === 0 ? (
    <>
      <ExercisesHeading />
      <Flex justify={"center"} asChild>
        <Section>
          <p>No exercises found.</p>
        </Section>
      </Flex>
    </>
  ) : (
    <>
      <ExercisesHeading />
      <Section>
        <ExerciseTable exercises={exercises} />
      </Section>
    </>
  );
}

export default Exercises;
