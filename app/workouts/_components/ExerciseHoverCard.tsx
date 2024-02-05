"use client";
import { Exercise } from "@prisma/client";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  Link,
  Text,
} from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export function ExerciseHoverCard({
  exercise,
  children,
}: PropsWithChildren<{ exercise: Exercise }>) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link color="gold">{children}</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex gap="4">
          <Avatar
            size="3"
            fallback="R"
            radius="full"
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
          />
          <Box>
            <Heading size="3" as="h3">
              {exercise.name}
            </Heading>
            <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
              {exercise.description}
            </Text>
          </Box>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
