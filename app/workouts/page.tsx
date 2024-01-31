import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

async function Workouts() {
  const workouts = await prisma.block.findMany({
    include: { exercises: true },
  });

  if (workouts.length === 0) {
    return <p>No workouts found.</p>;
  }

  return (
    <>
      <Heading as="h1" align={"center"}>
        Workouts
      </Heading>
      <section className="flex flex-col gap-3 items-center">
        {workouts.map((workout) => (
          <Card className="min-w-80 max-w-lg" key={workout.id} asChild>
            <Link href={`/workouts/${workout.id}`}>
              <Text as="p" size="2" weight="bold">
                {workout.name}
              </Text>
              {workout.description && (
                <Text as="p" color="gray" size="2">
                  {workout.description}
                </Text>
              )}
            </Link>
          </Card>
        ))}
      </section>
    </>
  );
}

export default Workouts;
