import * as Auth from "@/app/components/Authorize";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { Button, Flex, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { WorkoutCard } from "./WorkoutCard";

export type PrismaWorkout = Prisma.BlockGetPayload<{
  include: {
    exercises: {
      include: {
        exercise: true;
      };
    };
  };
}>;

async function Workouts() {
  const workouts = await prisma.block.findMany({
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  return (
    <>
      {workouts.length === 0 ? (
        <Flex align={"center"} direction={"column"}>
          <Section>
            <Auth.ADMIN>
              <Button asChild>
                <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
              </Button>
            </Auth.ADMIN>

            <p>No workouts found.</p>
          </Section>
        </Flex>
      ) : (
        <>
          <Flex align={"center"} direction={"column"} gap={"3"} asChild>
            <Heading as="h1">
              Workouts
              <Button asChild>
                <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
              </Button>
            </Heading>
          </Flex>
          <Flex direction={"column"} align={"center"} gap={"3"} asChild>
            <Section>
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </Section>
          </Flex>
        </>
      )}
    </>
  );
}

export default Workouts;
