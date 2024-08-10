/*
  Warnings:

  - Added the required column `userId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Workout` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserWorkout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workoutId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWorkoutExercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notes` TEXT NULL,
    `reps` INTEGER NOT NULL DEFAULT 0,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `time` INTEGER NOT NULL DEFAULT 0,
    `workoutExerciseId` INTEGER NOT NULL,
    `userWorkoutId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkoutExercise` ADD CONSTRAINT `UserWorkoutExercise_workoutExerciseId_fkey` FOREIGN KEY (`workoutExerciseId`) REFERENCES `WorkoutExercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkoutExercise` ADD CONSTRAINT `UserWorkoutExercise_userWorkoutId_fkey` FOREIGN KEY (`userWorkoutId`) REFERENCES `UserWorkout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
