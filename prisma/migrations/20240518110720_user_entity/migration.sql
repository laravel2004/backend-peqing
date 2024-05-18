-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
