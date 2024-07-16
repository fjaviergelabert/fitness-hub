import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import ExerciseTable from "./ExerciseTable";

async function Exercises() {
  const exercises = await prisma.exercise.findMany();
  return exercises.length === 0 ? (
    <Flex align={"center"} direction={"column"}>
      <p>No exercises found.</p>
    </Flex>
  ) : (
    <ExerciseTable exercises={exercises} />
  );
}

export default Exercises;
