import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/auth.route";
import typeNilaiRouter from "./routes/type_nilai.route";
import mahasiswaRouter from "./routes/mahasiswa.route";
import dosenRouter from "./routes/dosen.route";
import kelasRouter from "./routes/kelas.route";
import path from "path";
import fs from 'fs'
import nilaiRouter from "./routes/nilai.route";
import anggotaRouter from "./routes/anggota.route";
import { AuthMiddleware } from "./middlewares/auth.midleware";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

export const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const authMiddleware = new AuthMiddleware();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use('/auth', userRouter);
app.use('/type-nilai', authMiddleware.verifyToken, typeNilaiRouter);
app.use('/mahasiswa', authMiddleware.verifyToken, mahasiswaRouter);
app.use('/dosen', authMiddleware.verifyToken, dosenRouter);
app.use('/kelas', authMiddleware.verifyToken, kelasRouter);
app.use('/nilai', authMiddleware.verifyToken, nilaiRouter);
app.use('/anggota', authMiddleware.verifyToken, anggotaRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})