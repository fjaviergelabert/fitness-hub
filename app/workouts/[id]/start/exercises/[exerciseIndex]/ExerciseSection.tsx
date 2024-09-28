"use client";

import { ExerciseHoverCard } from "@/app/workouts/_components/ExerciseHoverCard";
import { Exercise } from "@prisma/client";
import { Flex, Heading, Section } from "@radix-ui/themes";
import Image from "next/image";

export function ExerciseSection({ exercise }: { exercise: Exercise }) {
  return (
    <Flex direction={"column"} gap={"6"} align={"center"} asChild>
      <Section>
        <ExerciseHoverCard exercise={exercise}>
          <Heading className="hover:text-red-500 cursor-help" color="gray">
            {exercise.name}
          </Heading>
        </ExerciseHoverCard>
        {exercise.mediaUrl ? (
          <Image
            src={exercise.mediaUrl}
            width={200}
            height={200}
            alt="Picture of the author"
          />
        ) : (
          exercise.description
        )}
      </Section>
    </Flex>
  );
}
