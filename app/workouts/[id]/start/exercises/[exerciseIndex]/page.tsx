import { getWorkout } from "@/prisma/queries";
import { Box, Button, Flex, Section } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string; exerciseIndex: string };
};

const Page = async ({ params: { id, exerciseIndex } }: Props) => {
  const index = Number(exerciseIndex);
  const workout = await getWorkout(Number(id));

  if (!workout || index > workout.exercises.length) {
    notFound();
  }

  return (
    <Section asChild>
      <Flex direction={"column"} gap={"5"} align={"center"}>
        <Box>{workout.exercises[index - 1].name}</Box>
        <Box>
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
        </Box>
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
