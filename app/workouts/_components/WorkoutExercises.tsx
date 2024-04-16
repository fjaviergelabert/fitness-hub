"use client";
import { Workout } from "@/schemas/exercise";
import { Button, Flex } from "@radix-ui/themes";
import { UseFormReturn } from "react-hook-form";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { ExerciseCard } from "./ExerciseCard";
import { RemoveButton } from "./RemoveButton";

export function WorkoutExercises({ form }: { form: UseFormReturn<Workout> }) {
  const { getValues, setValue } = form;
  const exercises = getValues("exercises");

  if (exercises.length === 0) {
    return null;
  }

  return exercises.map((exercise, index) => (
    <Flex key={exercise.orderId} className="group" gap={"3"}>
      <ExerciseCard
        exercise={exercise}
        onSelect={(type) => {
          // TODO: Fix type issue
          const newValue: any = exercises.map((e) =>
            e.orderId === exercise.orderId ? { ...e, type } : e
          );
          setValue("exercises", newValue, { shouldValidate: true });
        }}
        buttonsSection={
          <RemoveButton
            onClick={(e) => {
              // TODO: Fix type issue
              e.preventDefault();
              const newValue: any = exercises.filter((e) =>
                e.id ? e.id !== exercise.id : e.name !== exercise.name
              );
              form.setValue("exercises", newValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        }
      />
      <Flex className="invisible group-hover:visible" direction={"column"}>
        {index > 0 && (
          <Button
            type="button"
            color="blue"
            onClick={() => {
              const previousExercise = { ...exercises[index - 1] };
              // TODO: Fix type issue
              const newValue: any = exercises.map((_exercise, _index) => {
                if (_index === index - 1) {
                  return { ...exercise, orderId: previousExercise.orderId };
                }
                if (_index === index) {
                  return { ...previousExercise, orderId: exercise.orderId };
                }
                return _exercise;
              });
              setValue("exercises", newValue, { shouldValidate: true });
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
              const nextExercise = { ...exercises[index + 1] };
              // TODO: Fix type issue
              const newValue: any = exercises.map((_exercise, _index) => {
                if (_index === index + 1) {
                  return { ...exercise, orderId: nextExercise.orderId };
                }
                if (_index === index) {
                  return { ...nextExercise, orderId: exercise.orderId };
                }
                return _exercise;
              });
              setValue("exercises", newValue, { shouldValidate: true });
            }}
          >
            <SlArrowDown />
          </Button>
        )}
      </Flex>
    </Flex>
  ));
}
