"use client";
import { WorkoutExercise } from "@/schemas/exercise";
import { ExerciseType } from "@prisma/client";
import { Box, Button, Flex } from "@radix-ui/themes";
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
      <Flex className="invisible group-hover:visible" direction={"column"}>
        {index > 0 && (
          <Box>
            <Button
              type="button"
              color="blue"
              onClick={() => {
                onDecrementOrder(exercise, index);
              }}
            >
              <SlArrowUp />
            </Button>
          </Box>
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
    </Flex>
  ));
}
