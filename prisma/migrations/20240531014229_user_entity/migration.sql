/*
  Warnings:

  - You are about to drop the column `matakuliahId` on the `kelas` table. All the data in the column will be lost.
  - You are about to drop the `matakuliah` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_matakuliahId_fkey`;

-- AlterTable
ALTER TABLE `kelas` DROP COLUMN `matakuliahId`;

-- DropTable
DROP TABLE `matakuliah`;
