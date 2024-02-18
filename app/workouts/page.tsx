import prisma from "@/prisma/client";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { RemoveWorkoutButton } from "./RemoveWorkoutButton";

async function Workouts() {
  const workouts = await prisma.block.findMany({
    include: { exercises: true },
  });

  return (
    <>
      {workouts.length === 0 ? (
        <>
          <Button asChild>
            <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
          </Button>
          <p>No workouts found.</p>
        </>
      ) : (
        <>
          <Heading as="h1" align={"center"}>
            Workouts
          </Heading>
          <Button className="self-center" asChild>
            <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
          </Button>
          <section className="flex flex-col gap-3 items-center">
            {workouts.map((workout) => (
              <Card
                className="min-w-80 max-w-lg hover:bg-orange-950"
                key={workout.id}
              >
                <Flex direction={"row"} align={"center"} justify={"between"}>
                  <Link
                    className="flex-1"
                    href={`/workouts/${workout.id}/overview`}
                  >
                    <Text as="p" size="2" weight="bold">
                      {workout.name}
                    </Text>
                    {workout.description && (
                      <Text as="p" color="gray" size="2">
                        {workout.description}
                      </Text>
                    )}
                  </Link>
                  <Flex justify={"end"} gap={"3"}>
                    <Button variant="solid" color="blue" asChild>
                      <Link href={`/workouts/${workout.id}`}>Edit</Link>
                    </Button>
                    <RemoveWorkoutButton workoutId={workout.id} />
                  </Flex>
                </Flex>
              </Card>
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default Workouts;
