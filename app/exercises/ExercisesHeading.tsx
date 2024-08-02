import { Flex, Heading } from "@radix-ui/themes";

export function ExercisesHeading() {
  return (
    <Flex align={"center"} direction={"column"} gap={"3"} asChild>
      <Heading as="h1">Exercises</Heading>
    </Flex>
  );
}
