-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'PERSONAL_TRAINER', 'ADMIN') NOT NULL DEFAULT 'USER';