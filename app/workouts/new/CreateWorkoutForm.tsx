"use client";

import { Exercise } from "@prisma/client";
import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExerciseMenu } from "./ExerciseMenu";

export function CreateWorkoutForm(props: { exercises: Exercise[] }) {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  function onSelect(exercise: Exercise) {
    setExercises([...exercises, exercise]);
  }

  return (
    <>
      <ExerciseMenu exercises={props.exercises} onSelect={onSelect} />
      {exercises.length > 0 && (
        <>
          <Heading as="h3">Exercises: </Heading>
          {exercises.map((exercise) => (
            <Card className="min-w-80 max-w-lg" key={exercise.id}>
              <Flex direction={"row"} gap="3" align="center">
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
                <Button
                  onClick={() =>
                    setExercises(exercises.filter((e) => e.id !== exercise.id))
                  }
                >
                  X
                </Button>
              </Flex>
            </Card>
          ))}
        </>
      )}
      <Button
        onClick={() => {
          axios
            .post("/api/workouts", {
              name: "Workout1" + Date.now().toString(),
              exercises,
            })
            .then((res) => res.data);
          router.push("/workouts");
          router.refresh();
        }}
      >
        Save
      </Button>
    </>
  );
}
