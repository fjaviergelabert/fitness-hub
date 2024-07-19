"use client";
import { ExerciseType } from ".prisma/client";
import { Description } from "@/app/components/Description";
import { WorkoutExercise } from "@/schemas/exercise";
import { Box, Card, Flex, Select, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

export function ExerciseCard({
  exercise,
  buttonsSection,
  onSelect,
}: {
  exercise: WorkoutExercise;
  buttonsSection: ReactNode;
  onSelect: (type: ExerciseType) => void;
}) {
  return (
    <Card className="flex-auto max-w-lg" key={exercise.id}>
      <Flex justify={"between"} direction={"row"} gap="3">
        <Box>
          <Text as="p" size="2" weight="bold">
            {exercise.name}
          </Text>
          {exercise.description && (
            <Box display={{ initial: "none", sm: "block" }} maxWidth={"16em"}>
              <Description>{exercise.description}</Description>
            </Box>
          )}
        </Box>
        <Flex gap="3" align={"center"}>
          <TypeSelect value={exercise.type} onSelect={onSelect} />
          {buttonsSection}
        </Flex>
      </Flex>
    </Card>
  );
}

function TypeSelect({
  value,
  onSelect,
}: {
  value: ExerciseType;
  onSelect: (type: ExerciseType) => void;
}) {
  const types = Object.values(ExerciseType);
  return (
    <Select.Root value={value} onValueChange={onSelect}>
      <Select.Trigger />
      <Select.Content>
        {types.map((t) => (
          <Select.Item key={t} value={t}>
            {t}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
