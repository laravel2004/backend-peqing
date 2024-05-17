import express from "express";
import { TypeNilaiController } from "../features/type_nilai/controllers/type_nilai.controller";


const typeNilaiRouter = express.Router();
const typeNilaiController = new TypeNilaiController();

typeNilaiRouter.get('/', typeNilaiController.getAll.bind(typeNilaiController));
typeNilaiRouter.get('/:id', typeNilaiController.findId.bind(typeNilaiController));

typeNilaiRouter.get('/matakuliah/:id', typeNilaiController.findByMatakuliahId.bind(typeNilaiController));

typeNilaiRouter.post('/', typeNilaiController.create.bind(typeNilaiController));
typeNilaiRouter.patch('/:id', typeNilaiController.update.bind(typeNilaiController));
typeNilaiRouter.put("/:id", typeNilaiController.update.bind(typeNilaiController));
typeNilaiRouter.delete('/:id', typeNilaiController.delete.bind(typeNilaiController));

export default typeNilaiRouter;