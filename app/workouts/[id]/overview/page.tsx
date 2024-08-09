import { Description } from "@/app/_shared/components/Description";
import { getWorkout } from "@/app/workouts/_actions";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const workout = await getWorkout(Number(id));

  if (!workout) {
    notFound();
  }

  return (
    <Flex direction={"column"} align={"center"}>
      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading as="h1">{workout.name}</Heading>
        <Button asChild>
          <Link href={"/workouts/" + id + "/start/exercises/1"}>
            START WORKOUT
          </Link>
        </Button>
      </Flex>

      {workout.description && (
        <Flex direction={"column"} width={{ sm: "70vh", lg: "100vh" }} asChild>
          <Section display={{ initial: "none", xs: "none", sm: "initial" }}>
            <Separator my="3" size="4" />
            <Description>{workout.description}</Description>
            <Separator my="3" size="4" />
          </Section>
        </Flex>
      )}

      <Flex gap={"3"} direction={"column"} py={"6"}>
        <Heading align={"center"} as="h2" size={"4"}>
          Exercises
        </Heading>
        {workout.exercises.map((e) => {
          return (
            <Box key={e.orderId} asChild>
              <Card>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={e.mediaUrl!}
                    radius="full"
                    fallback="?"
                  />
                  <Flex
                    direction={"column"}
                    justify={"center"}
                    flexGrow={"1"}
                    width={{ initial: "100px", xs: "100px", sm: "200px" }}
                  >
                    <Text as="p" size="2" weight="bold">
                      {e.name}
                    </Text>
                    <Text color="gray" as="p" size={"1"} truncate>
                      {e.description}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Page;
