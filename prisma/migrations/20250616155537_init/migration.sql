-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
