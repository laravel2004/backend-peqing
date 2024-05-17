import express from "express";
import { MahasiswaController } from "../features/mahasiswa/controllers/mahasiswa.controller";
import multer from "multer";

const upload = multer({dest: '/uploads/'});

const mahasiswaRouter = express.Router();
const mahasiswaController = new MahasiswaController();

mahasiswaRouter.post('/csv', upload.single('file'), mahasiswaController.createMany.bind(mahasiswaController));
mahasiswaRouter.get('/:id', mahasiswaController.findId.bind(mahasiswaController));

export default mahasiswaRouter;