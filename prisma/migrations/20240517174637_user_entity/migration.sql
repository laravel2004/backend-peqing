/*
  Warnings:

  - Added the required column `departement` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurusan` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AnggotaKelas_kelasId_fkey` ON `anggotakelas`;

-- DropIndex
DROP INDEX `Kelas_matakuliahId_fkey` ON `kelas`;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `departement` VARCHAR(191) NOT NULL,
    ADD COLUMN `jurusan` VARCHAR(191) NOT NULL;
