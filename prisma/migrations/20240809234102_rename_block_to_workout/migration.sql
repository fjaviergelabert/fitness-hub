/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BlockExercise` DROP FOREIGN KEY `BlockExercise_blockId_fkey`;

-- DropForeignKey
ALTER TABLE `BlockExercise` DROP FOREIGN KEY `BlockExercise_exerciseId_fkey`;

-- DropTable
DROP TABLE `Block`;

-- DropTable
DROP TABLE `BlockExercise`;

-- CreateTable
CREATE TABLE `Workout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `Workout_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkoutExercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('NONE', 'TIMER', 'COUNTDOWN', 'MAX_REPS') NOT NULL DEFAULT 'NONE',
    `orderId` INTEGER NOT NULL DEFAULT 0,
    `exerciseId` INTEGER NOT NULL,
    `workoutId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkoutExercise` ADD CONSTRAINT `WorkoutExercise_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutExercise` ADD CONSTRAINT `WorkoutExercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
