"use client";
import { ExerciseForm } from "@/app/_shared/components/ExerciseForm";
import { exerciseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import {
  FieldValues,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

export const ExerciseDialog = ({
  onSubmit,
}: {
  onSubmit: (exercise: Exercise) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<Exercise>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      mediaUrl: "",
    },
  });

  const submit = (values: FieldValues) => {
    onSubmit(values as Exercise);
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
          form={form}
          onSubmit={() => {}}
          buttonSection={
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  type="button"
                  variant="soft"
                  color="gray"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <SubmitButton
                  onClick={(form) => {
                    form.handleSubmit(submit)();
                  }}
                />
              </AlertDialog.Action>
            </Flex>
          }
        />
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

const SubmitButton = (props: {
  onClick: (form: UseFormReturn<Exercise>) => void;
}) => {
  const form = useFormContext<Exercise>();
  return (
    <Button
      type="button"
      variant="solid"
      color="green"
      onClick={() => {
        props.onClick(form);
      }}
    >
      Save
    </Button>
  );
};
