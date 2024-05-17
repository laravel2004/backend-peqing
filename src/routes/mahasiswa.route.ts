import express from "express";
import { MahasiswaController } from "../features/mahasiswa/controllers/mahasiswa.controller";
import multer from "multer";

const upload = multer({dest: '/uploads/'});

const mahasiswaRouter = express.Router();
const mahasiswaController = new MahasiswaController();

mahasiswaRouter.get('/me', mahasiswaController.me.bind(mahasiswaController));
mahasiswaRouter.post('/csv', upload.single('file'), mahasiswaController.createMany.bind(mahasiswaController));
mahasiswaRouter.get('/:id', mahasiswaController.findId.bind(mahasiswaController));
mahasiswaRouter.get('/', mahasiswaController.getAll.bind(mahasiswaController));
// mahasiswaRouter.post('/', mahasiswaController.create.bind(mahasiswaController));
mahasiswaRouter.put("/:id", mahasiswaController.update.bind(mahasiswaController));
mahasiswaRouter.delete('/:id', mahasiswaController.delete.bind(mahasiswaController));
mahasiswaRouter.patch('/:id', mahasiswaController.update.bind(mahasiswaController));
export default mahasiswaRouter;