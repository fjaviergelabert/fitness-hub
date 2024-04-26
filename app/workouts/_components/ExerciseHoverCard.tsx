"use client";
import AppLogo from "@/app/AppLogo";
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
            fallback={<AppLogo />}
            radius="full"
            src={exercise.mediaUrl || ""}
          />
          <Box>
            <Heading size="3" as="h3">
              {exercise.name}
            </Heading>
            <Text as="div" size="2">
              {exercise.description}
            </Text>
          </Box>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
