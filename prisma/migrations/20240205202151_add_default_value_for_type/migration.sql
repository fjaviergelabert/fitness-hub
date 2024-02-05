/*
  Warnings:

  - Made the column `type` on table `blockexercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blockexercise` MODIFY `type` ENUM('NONE', 'TIMER', 'COUNTDOWN', 'MAX_REPS') NOT NULL DEFAULT 'NONE';
