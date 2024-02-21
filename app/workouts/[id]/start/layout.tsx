import prisma from "@/prisma/client";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import Stopwatch from "./Stopwatch";

// TODO: Create exerciseBlock reps and time fields (to replace TYPE? reps and time could coexist together)
// ? TODO:      To use just description for now?????????????

// ! TODO Cache the stopwatch component to render only once per workout, and revalidate on /start path level change

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
    <Section grow={"1"}>
      <Flex grow={"1"} direction={"column"} align={"center"}>
        <Flex direction={"column"} align={"center"} gap={"2"}>
          <Heading as="h1">{workout.name}</Heading>
          <Heading as="h2" color="amber">
            <Stopwatch />
          </Heading>
        </Flex>
        {children}
      </Flex>
    </Section>
  );
};

export default Layout;
