"use client";
import { ExerciseForm } from "@/app/components/ExerciseForm";
import { WorkoutExercise } from "@/schemas/exercise";
import { Exercise } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

export const ExerciseDialog = ({
  onSubmit,
}: {
  onSubmit: (exercise: WorkoutExercise) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext<Exercise>();

  // TODO: Figure out form state type
  const submit = (exercise: FieldValues) => {
    onSubmit(exercise as WorkoutExercise);
    setOpen(false);
  };

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger>
        <Button variant="solid" onClick={() => setOpen(true)}>
          New Exercise
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Create new Exercise</AlertDialog.Title>
        <ExerciseForm
          onSubmit={submit}
          buttonSection={
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  variant="soft"
                  color="gray"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  color="green"
                  onClick={async (e) => {
                    form.handleSubmit(submit)();
                  }}
                >
                  Save
                </Button>
              </AlertDialog.Action>
            </Flex>
          }
        />
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
