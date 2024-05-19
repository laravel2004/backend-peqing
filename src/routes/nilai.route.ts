import express from 'express';
import { NilaiController } from '../features/nilai/controllers/nilai.controller';

const nilaiRouter = express.Router();
const nilaiController = new NilaiController();

nilaiRouter.get('/:kelasId/:mahasiswaId', nilaiController.findByMahasiswa.bind(nilaiController));
nilaiRouter.get('/:kelasId', nilaiController.findByKelasId.bind(nilaiController));
nilaiRouter.post('/:kelasId', nilaiController.create.bind(nilaiController));
nilaiRouter.put('/:kelasId/:id', nilaiController.update.bind(nilaiController));
nilaiRouter.patch('/:kelasId/:id', nilaiController.update.bind(nilaiController));
nilaiRouter.delete('/:id', nilaiController.delete.bind(nilaiController));

export default nilaiRouter;


