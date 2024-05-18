import expess from "express";
import { KelasController } from "../features/kelas/controllers/kelas.controller";

const kelasRouter = expess.Router();
const kelasController = new KelasController();

kelasRouter.get('/', kelasController.getAll.bind(kelasController));
kelasRouter.get('/dosen-matakuliah', kelasController.getWithDosenMatakuliah.bind(kelasController));
kelasRouter.get('/dosen-matakuliah/:id', kelasController.findWithDosenMatakuliah.bind(kelasController));
kelasRouter.post('/', kelasController.create.bind(kelasController));
kelasRouter.put('/:id', kelasController.update.bind(kelasController));
kelasRouter.patch('/:id', kelasController.update.bind(kelasController));
kelasRouter.delete('/:id', kelasController.delete.bind(kelasController));

export default kelasRouter;