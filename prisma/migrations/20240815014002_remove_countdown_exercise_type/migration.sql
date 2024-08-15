/*
  Warnings:

  - The values [COUNTDOWN] on the enum `WorkoutExercise_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `WorkoutExercise` MODIFY `type` ENUM('NONE', 'TIMER', 'MAX_REPS') NOT NULL DEFAULT 'NONE';
