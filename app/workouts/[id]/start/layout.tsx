import prisma from "@/prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import Stopwatch from "./Stopwatch";

const Layout = async ({
  params: { id },
  children,
}: PropsWithChildren<{ params: { id: string } }>) => {
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
    <Flex direction={"column"} align={"center"}>
      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading as="h1">{workout.name}</Heading>
        <Heading as="h2" color="amber">
          <Stopwatch />
        </Heading>
      </Flex>
      {children}
    </Flex>
  );
};

export default Layout;
