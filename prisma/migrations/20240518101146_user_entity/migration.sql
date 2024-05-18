/*
  Warnings:

  - You are about to drop the column `subKelasId` on the `anggotakelas` table. All the data in the column will be lost.
  - You are about to drop the column `matakuliahId` on the `typenilai` table. All the data in the column will be lost.
  - You are about to drop the `subkelas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dosenId` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelasId` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelasId` to the `TypeNilai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `anggotakelas` DROP FOREIGN KEY `AnggotaKelas_subKelasId_fkey`;

-- DropForeignKey
ALTER TABLE `subkelas` DROP FOREIGN KEY `SubKelas_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `typenilai` DROP FOREIGN KEY `TypeNilai_matakuliahId_fkey`;

-- AlterTable
ALTER TABLE `anggotakelas` DROP COLUMN `subKelasId`;

-- AlterTable
ALTER TABLE `kelas` ADD COLUMN `dosenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `nilai` ADD COLUMN `kelasId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `typenilai` DROP COLUMN `matakuliahId`,
    ADD COLUMN `kelasId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `subkelas`;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnggotaKelas` ADD CONSTRAINT `AnggotaKelas_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeNilai` ADD CONSTRAINT `TypeNilai_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
