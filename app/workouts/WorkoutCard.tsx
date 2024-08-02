import * as Auth from "@/app/components/Authorize";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Description } from "../components/Description";
import { CloneWorkoutButton } from "./CloneWorkoutButton";
import { PrismaWorkout } from "./page";
import { RemoveWorkoutButton } from "./RemoveWorkoutButton";

export function WorkoutCard({ workout }: { workout: PrismaWorkout }) {
  return (
    <Box className="hover:bg-orange-950 min-w-96 w-3/6" asChild>
      <Card size={"3"}>
        <Flex direction={"row"} align={"center"} justify={"between"} gap={"2"}>
          <Link className="min-w-0" href={`/workouts/${workout.id}/overview`}>
            <Text className="pointer-events-auto" as="p" size="2" weight="bold">
              {workout.name}
            </Text>
            {workout.description && (
              <Description>{workout.description}</Description>
            )}
          </Link>
          <Auth.PERSONAL_TRAINER>
            <Flex className="pointer-events-auto" justify={"end"} gap={"3"}>
              <Button variant="solid" color="blue" asChild>
                <Link href={`/workouts/${workout.id}`}>Edit</Link>
              </Button>
              <CloneWorkoutButton workoutId={workout.id} />
              <RemoveWorkoutButton workoutId={workout.id} />
            </Flex>
          </Auth.PERSONAL_TRAINER>
        </Flex>
      </Card>
    </Box>
  );
}
