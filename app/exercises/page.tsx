import prisma from "@/prisma/client";
import ExerciseTable from "./ExerciseTable";

async function Exercises() {
  const exercises = await prisma.exercise.findMany();
  return <ExerciseTable exercises={exercises} />;
}

export default Exercises;
