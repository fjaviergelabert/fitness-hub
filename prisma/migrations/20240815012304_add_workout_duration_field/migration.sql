/*
  Warnings:

  - You are about to drop the column `date` on the `UserWorkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserWorkout` DROP COLUMN `date`,
    ADD COLUMN `duration` DOUBLE NOT NULL DEFAULT 0;
