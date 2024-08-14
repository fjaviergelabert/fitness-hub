"use server";

import { withPersonalTrainerRole } from "@/app/_shared/lib/WithSession";
import {
  _cloneWorkout,
  _createWorkout,
  _deleteWorkout,
  _updateWorkout,
} from "./Workouts";

import { _getWorkout } from "./Workouts";

export const getWorkout = _getWorkout;

export const createWorkout = withPersonalTrainerRole(_createWorkout);
export const updateWorkout = withPersonalTrainerRole(_updateWorkout);
export const cloneWorkout = withPersonalTrainerRole(_cloneWorkout);
export const deleteWorkout = withPersonalTrainerRole(_deleteWorkout);
