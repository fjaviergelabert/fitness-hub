import prisma from "@/prisma/client";
import { Box, Button, Flex, Section } from "@radix-ui/themes";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string; exerciseIndex: string };
};

const Page = async ({ params: { id, exerciseIndex } }: Props) => {
  const index = Number(exerciseIndex);
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
  const url = headers().get("referer");
  const path = url?.replace(/\/exercises\/\d+/, "/exercises");

  if (!workout || index > workout.exercises.length) {
    notFound();
  }

  return (
    <Section>
      <Flex direction={"column"} gap={"5"} align={"stretch"}>
        <Box>{workout.exercises[index - 1].exercise.name}</Box>
        <Flex justify={"between"}>
          <Button disabled={index === 1} asChild>
            <Link
              href={`${index - 1}`}
              className={index === 1 ? "pointer-events-none" : ""}
              aria-disabled={index === 1}
            >
              {"<"}
            </Link>
          </Button>
          <Button disabled={index === workout.exercises.length} asChild>
            <Link
              href={`${index + 1}`}
              className={
                index === workout.exercises.length ? "pointer-events-none" : ""
              }
              aria-disabled={index === workout.exercises.length}
            >
              {">"}
            </Link>
          </Button>
        </Flex>
        {index === workout.exercises.length && (
          <Button color="grass" asChild>
            <Link href={`/workouts`}>{"COMPLETE"}</Link>
          </Button>
        )}
      </Flex>
    </Section>
  );
};

export default Page;
