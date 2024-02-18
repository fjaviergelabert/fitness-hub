import prisma from "@/prisma/client";
import { Button, Flex, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const workout = await prisma.block.findUnique({
    where: { id: Number(id) },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <Section grow={"1"}>
      <Flex grow={"1"} direction={"column"} align={"center"}>
        <Flex direction={"column"} align={"center"} gap={"2"}>
          <Heading as="h1">{workout.name}</Heading>
          <Button asChild>
            <Link href={"/workouts/" + id + "/start/exercises/1"}>
              START WORKOUT
            </Link>
          </Button>
        </Flex>
        <Section>{workout.description}</Section>
        {workout.exercises.map((e) => {
          return <div key={e.id}>{e.exercise.name}</div>;
        })}
      </Flex>
    </Section>
  );
};

export default Page;
