import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";

export default async function Dashboard() {
  const session = await auth();
  const completedUserWorkouts = await prisma.userWorkout.findMany({
    include: { user: true, workout: true },
    where: {
      userId: session?.user.id,
    },
    take: 5,
    orderBy: { date: "desc" },
  });
  const createdUserWorkouts = await prisma.workout.findMany({
    include: { user: true },
    where: {
      userId: session?.user.id,
    },
    take: 5,
  });

  return (
    <>
      <Flex justify={"center"} asChild>
        <Heading>Dashboard</Heading>
      </Flex>
      <Section asChild>
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          <Box height="64px">
            <Flex justify={"center"} asChild>
              <Heading size={"4"}>Workouts done</Heading>
            </Flex>

            {completedUserWorkouts.map((completedWorkout) => (
              <Box key={completedWorkout.id}>
                <p>{completedWorkout.workout.name}</p>
                <p>{completedWorkout.user.name}</p>
              </Box>
            ))}
          </Box>
          <Box height="64px">
            <Flex justify={"center"} asChild>
              <Heading size={"4"}>Created by you</Heading>
            </Flex>
            {createdUserWorkouts.map((workout) => (
              <Box key={workout.id}>
                <p>{workout.name}</p>
                <p>{workout.user.name}</p>
              </Box>
            ))}
          </Box>
        </Grid>
      </Section>
    </>
  );
}
