/*
  Warnings:

  - A unique constraint covering the columns `[nrp]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mahasiswa_nrp_key` ON `Mahasiswa`(`nrp`);
