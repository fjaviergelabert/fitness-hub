"use server";
import { withPersonalTrainerRole } from "@/app/_shared/lib/WithSession";
import { _createExercise, _deleteExercise, _updateExercise } from "./Exercises";

export const updateExercise = withPersonalTrainerRole(_updateExercise);
export const createExercise = withPersonalTrainerRole(_createExercise);
export const deleteExercise = withPersonalTrainerRole(_deleteExercise);
