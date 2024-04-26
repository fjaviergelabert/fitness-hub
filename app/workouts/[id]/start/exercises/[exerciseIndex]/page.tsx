import { ExerciseHoverCard } from "@/app/workouts/_components/ExerciseHoverCard";
import { getWorkout } from "@/prisma/queries";
import { Box, Button, Flex, Heading, Section } from "@radix-ui/themes";
import Image from "next/image";
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

  const exercise = workout.exercises[index - 1];

  return (
    <Flex direction={"column"} gap={"5"} align={"center"}>
      <Flex direction={"column"} gap={"6"} align={"center"} asChild>
        <Section>
          <ExerciseHoverCard exercise={exercise}>
            <Heading className="hover:text-red-500 cursor-help" color="gray">
              {exercise.name}
            </Heading>
          </ExerciseHoverCard>
          {exercise.mediaUrl ? (
            <Image
              src={exercise.mediaUrl}
              width={200}
              height={200}
              alt="Picture of the author"
            />
          ) : (
            exercise.description
          )}
        </Section>
      </Flex>
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
      {index === workout.exercises.length ? (
        <Button color="grass" asChild>
          <Link href={`/workouts`}>{"COMPLETE"}</Link>
        </Button>
      ) : (
        <Button color="red" variant="soft" asChild>
          <Link href={`/workouts`}>{"SURRENDER"}</Link>
        </Button>
      )}
    </Flex>
  );
};

export default Page;
