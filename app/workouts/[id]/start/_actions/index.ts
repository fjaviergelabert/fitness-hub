"use server";

import { withUserRole } from "@/app/_shared/lib/WithSession";
import { _createUserWorkout } from "./UserWorkouts";

export const createUserWorkout = withUserRole(_createUserWorkout);
