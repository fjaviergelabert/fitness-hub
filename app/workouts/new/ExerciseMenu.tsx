"use client";
import { Exercise } from "@prisma/client";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Fragment, PropsWithChildren } from "react";
import { FaCaretDown } from "react-icons/fa";
import { ExerciseHoverCard } from "./ExerciseHoverCard";

export const ExerciseMenu = (
  props: PropsWithChildren<{
    exercises: Exercise[];
    onSelect: (exercise: Exercise) => void;
  }>
) => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Add exercise
            <FaCaretDown />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {props.exercises.map((exercise, index) =>
            index === 0 ? (
              <DropdownMenu.Item
                key={exercise.id}
                onClick={() => props.onSelect(exercise)}
              >
                <ExerciseHoverCard exercise={exercise}>
                  {exercise.name}
                </ExerciseHoverCard>
              </DropdownMenu.Item>
            ) : (
              <Fragment key={exercise.id}>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => props.onSelect(exercise)}>
                  <ExerciseHoverCard exercise={exercise}>
                    {exercise.name}
                  </ExerciseHoverCard>
                </DropdownMenu.Item>
              </Fragment>
            )
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
