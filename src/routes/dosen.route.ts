import express from "express";
import { DosenController } from "../features/dosen/controllers/dosen.controller";

const dosenRouter = express.Router();
const dosenController = new DosenController();

dosenRouter.get('/', dosenController.getAll.bind(dosenController));
dosenRouter.get('/:id', dosenController.findId.bind(dosenController));
dosenRouter.post('/', dosenController.create.bind(dosenController));
dosenRouter.post('/csv', dosenController.createMany.bind(dosenController));
dosenRouter.put('/:id', dosenController.update.bind(dosenController));
dosenRouter.patch('/:id', dosenController.update.bind(dosenController));
dosenRouter.delete('/:id', dosenController.delete.bind(dosenController));
dosenRouter.get('/me', dosenController.me.bind(dosenController));

export default dosenRouter;