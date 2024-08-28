import { auth } from "@/auth";
import prisma from "@/prisma/client";
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Section,
} from "@radix-ui/themes";
import { TruncatedText } from "../_shared/components/TruncatedText";

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
            <Flex direction={"column"} align={"center"}>
              {completedUserWorkouts.map(({ workout, id }) => (
                <Box key={id} className="hover:bg-orange-950 w-2/3" asChild>
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
                        <TruncatedText weight="bold">
                          {workout.name}
                        </TruncatedText>
                        {workout.description && (
                          <TruncatedText>{workout.description}</TruncatedText>
                        )}
                      </Link>
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Flex>
          </Box>
          <Box height="64px">
            <Flex justify={"center"} asChild>
              <Heading size={"4"}>Created by you</Heading>
            </Flex>
            <Flex direction={"column"} align={"center"}>
              {createdUserWorkouts.map((workout) => (
                <Box
                  key={workout.id}
                  className="hover:bg-orange-950 w-2/3"
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
                        <TruncatedText weight="bold">
                          {workout.name}
                        </TruncatedText>
                        {workout.description && (
                          <TruncatedText>{workout.description}</TruncatedText>
                        )}
                      </Link>
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Section>
    </>
  );
}
