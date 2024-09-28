import { getWorkout } from "@/app/workouts/_actions";
import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteWorkoutButton } from "./CompleteWorkoutButton";
import { ExerciseSection } from "./ExerciseSection";

type Props = {
  params: { id: string; exerciseIndex: string };
};

async function Page({ params: { id, exerciseIndex } }: Props) {
  const index = Number(exerciseIndex);
  const workout = await getWorkout(Number(id));

  if (!workout || index > workout.exercises.length) {
    notFound();
  }

  const exercise = workout.exercises[index - 1];

  return (
    <Flex direction={"column"} gap={"5"} align={"center"}>
      <ExerciseSection exercise={exercise} />
      <NavigationButtons index={index} workout={workout} />
      {index === workout.exercises.length ? (
        <CompleteWorkoutButton workout={workout} />
      ) : (
        <Button color="red" variant="soft" asChild>
          <Link href={`/workouts`}>{"SURRENDER"}</Link>
        </Button>
      )}
    </Flex>
  );
}

export default Page;

function NavigationButtons({
  index,
  workout,
}: {
  index: number;
  workout: NonNullable<Awaited<ReturnType<typeof getWorkout>>>;
}) {
  return (
    <Box>
      <Button disabled={index === 1}>
        <Link
          href={`${index - 1}`}
          className={index === 1 ? "pointer-events-none" : ""}
          aria-disabled={index === 1}
        >
          {"<"}
        </Link>
      </Button>
      <Button disabled={index === workout.exercises.length}>
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
  );
}
