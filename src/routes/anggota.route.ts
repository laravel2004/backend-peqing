import express from 'express';
import { AnggotaController } from '../features/anggota_kelas/controllers/anggota.controller';

const anggotaRouter = express.Router();
const anggotaController = new AnggotaController();

anggotaRouter.get('/:id', anggotaController.findKelasId.bind(anggotaController));
anggotaRouter.post('/', anggotaController.create.bind(anggotaController));
anggotaRouter.put('/:id', anggotaController.update.bind(anggotaController));
anggotaRouter.patch('/:id', anggotaController.update.bind(anggotaController));
anggotaRouter.delete('/:id', anggotaController.delete.bind(anggotaController));

export default anggotaRouter;