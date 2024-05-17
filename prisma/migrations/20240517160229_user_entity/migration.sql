/*
  Warnings:

  - You are about to drop the column `dosenId` on the `kelas` table. All the data in the column will be lost.
  - You are about to drop the column `dosenId` on the `nilai` table. All the data in the column will be lost.
  - You are about to drop the column `matakuliahId` on the `nilai` table. All the data in the column will be lost.
  - Added the required column `subKelasId` to the `AnggotaKelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeNilaiId` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `anggotakelas` DROP FOREIGN KEY `AnggotaKelas_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_matakuliahId_fkey`;

-- DropForeignKey
ALTER TABLE `nilai` DROP FOREIGN KEY `Nilai_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `nilai` DROP FOREIGN KEY `Nilai_matakuliahId_fkey`;

-- AlterTable
ALTER TABLE `anggotakelas` ADD COLUMN `subKelasId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kelas` DROP COLUMN `dosenId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `qr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nilai` DROP COLUMN `dosenId`,
    DROP COLUMN `matakuliahId`,
    ADD COLUMN `typeNilaiId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SubKelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dosenId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeNilai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `matakuliahId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubKelas` ADD CONSTRAINT `SubKelas_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnggotaKelas` ADD CONSTRAINT `AnggotaKelas_subKelasId_fkey` FOREIGN KEY (`subKelasId`) REFERENCES `SubKelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeNilai` ADD CONSTRAINT `TypeNilai_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
