-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_typeNilaiId_fkey` FOREIGN KEY (`typeNilaiId`) REFERENCES `TypeNilai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
