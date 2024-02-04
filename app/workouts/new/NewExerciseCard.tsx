"use client";
import { Exercise } from "@prisma/client";

export function NewExerciseCard({
  onClick,
}: {
  onClick: (exercise: Exercise) => any;
}) {
  const newExercise = {
    id: 0,
    name: "",
    description: null,
    mediaUrl: null,
  };

  return null;

  // return (
  //   <ExerciseCard
  //     exercise={newExercise}
  //     buttonsSection={
  //       <Button color="green" onClick={() => onClick(newExercise)}>
  //         <FaPlus size={"1rem"} />
  //       </Button>
  //     }
  //   />
  // );
}
