import * as Auth from "@/app/components/Authorize";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export function CreateWorkoutButton() {
  return (
    <Auth.PERSONAL_TRAINER>
      <Button asChild>
        <Link href={"/workouts/new"}>CREATE WORKOUT</Link>
      </Button>
    </Auth.PERSONAL_TRAINER>
  );
}
