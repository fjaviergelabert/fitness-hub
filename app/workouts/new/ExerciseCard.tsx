"use client";
import { ExerciseType } from ".prisma/client";
import { WorkoutExercise } from "@/schemas/exercise";
import { Button, Card, Container, Flex, Select, Text } from "@radix-ui/themes";
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
    <Card className="min-w-80 max-w-lg" key={exercise.id}>
      <Flex direction={"row"} gap="3">
        <Container>
          <Text as="p" size="2" weight="bold">
            {exercise.name}
          </Text>
          {exercise.description && (
            <Text as="p" color="gray" size="2">
              {exercise.description}
            </Text>
          )}
        </Container>
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
  value: ExerciseType | undefined;
  onSelect: (type: ExerciseType) => void;
}) {
  const types = Object.values(ExerciseType);
  return (
    <Select.Root value={value} defaultValue="NONE" onValueChange={onSelect}>
      <Select.Trigger>
        <Button variant="soft">Exercise Type</Button>
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="NONE" disabled>
          Exercise Type
        </Select.Item>
        <Select.Separator />
        {types.map((t) => (
          <Select.Item key={t} value={t}>
            {t}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
