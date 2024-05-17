import express from "express"
import { MatakuliahController } from "../features/matakuliah/controllers/matakuliah.controller";

const mkRouter = express.Router();
const mataKuliahController = new MatakuliahController();

mkRouter.get('/', mataKuliahController.getAll.bind(mataKuliahController));
mkRouter.get('/:id', mataKuliahController.findId.bind(mataKuliahController));
mkRouter.post('/', mataKuliahController.create.bind(mataKuliahController));
mkRouter.patch('/:id', mataKuliahController.update.bind(mataKuliahController));
mkRouter.put("/:id", mataKuliahController.update.bind(mataKuliahController));
mkRouter.delete('/:id', mataKuliahController.delete.bind(mataKuliahController));

export default mkRouter;