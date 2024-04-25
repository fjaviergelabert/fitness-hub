"use client";
import { WorkoutExercise } from "@/schemas/exercise";
import { ExerciseType } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { ExerciseCard } from "./ExerciseCard";
import { RemoveButton } from "./RemoveButton";

export function WorkoutExercises({
  exercises,
  onTypeSelect,
  onRemoveClick,
  onDecrementOrder,
  onIncrementOrder,
}: {
  exercises: WorkoutExercise[];
  onTypeSelect: (exercise: WorkoutExercise, type: ExerciseType) => void;
  onRemoveClick: (exercise: WorkoutExercise) => void;
  onDecrementOrder: (exercise: WorkoutExercise, index: number) => void;
  onIncrementOrder: (exercise: WorkoutExercise, index: number) => void;
}) {
  if (exercises.length === 0) {
    return null;
  }

  return exercises.map((exercise, index) => (
    <Flex key={exercise.orderId} className="group" gap={"3"}>
      <ExerciseCard
        exercise={exercise}
        onSelect={(type) => {
          onTypeSelect(exercise, type);
        }}
        buttonsSection={
          <RemoveButton
            onClick={() => {
              onRemoveClick(exercise);
            }}
          />
        }
      />
      {exercises.length > 1 && (
        <Flex
          className="invisible group-hover:visible"
          direction={"column"}
          justify={
            index === 0
              ? "end"
              : index === exercises.length - 1
              ? "start"
              : "center"
          }
        >
          {index > 0 && (
            <Button
              type="button"
              color="blue"
              onClick={() => {
                onDecrementOrder(exercise, index);
              }}
            >
              <SlArrowUp />
            </Button>
          )}
          {index < exercises.length - 1 && (
            <Button
              type="button"
              color="blue"
              onClick={() => {
                onIncrementOrder(exercise, index);
              }}
            >
              <SlArrowDown />
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  ));
}
