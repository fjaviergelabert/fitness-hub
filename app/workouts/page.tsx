import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Section,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import { CloneWorkoutButton } from "./CloneWorkoutButton";
import { RemoveWorkoutButton } from "./RemoveWorkoutButton";

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
        <>
          <Button asChild>
            <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
          </Button>
          <p>No workouts found.</p>
        </>
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
                <Box
                  key={workout.id}
                  className="hover:bg-orange-950 min-w-96 w-3/6"
                  asChild
                >
                  <Card size={"3"}>
                    <Flex
                      direction={"row"}
                      align={"center"}
                      justify={"between"}
                      gap={"2"}
                    >
                      <Link
                        className="min-w-0"
                        href={`/workouts/${workout.id}/overview`}
                      >
                        <Text
                          className="pointer-events-auto"
                          as="p"
                          size="2"
                          weight="bold"
                        >
                          {workout.name}
                        </Text>
                        {workout.description && (
                          <Tooltip content={workout.description}>
                            <Text as="p" color="gray" size="2" truncate>
                              {workout.description}
                            </Text>
                          </Tooltip>
                        )}
                      </Link>
                      <Flex
                        className="pointer-events-auto"
                        justify={"end"}
                        gap={"3"}
                      >
                        <Button variant="solid" color="blue" asChild>
                          <Link href={`/workouts/${workout.id}`}>Edit</Link>
                        </Button>
                        <CloneWorkoutButton workoutId={workout.id} />
                        <RemoveWorkoutButton workoutId={workout.id} />
                      </Flex>
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Section>
          </Flex>
        </>
      )}
    </>
  );
}

export default Workouts;
