/*
  Warnings:

  - Added the required column `toko_id` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` ADD COLUMN `toko_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Toko` (
    `toko_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_toko` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Toko_nama_toko_key`(`nama_toko`),
    PRIMARY KEY (`toko_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_toko_id_fkey` FOREIGN KEY (`toko_id`) REFERENCES `Toko`(`toko_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
