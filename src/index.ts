import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/auth.route";
import mkRouter from "./routes/matakuliah.route";
import typeNilaiRouter from "./routes/type_nilai.route";
import mahasiswaRouter from "./routes/mahasiswa.route";
import dosenRouter from "./routes/dosen.route";
import kelasRouter from "./routes/kelas.route";
import path from "path";
import fs from 'fs'
import nilaiRouter from "./routes/nilai.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

export const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use('/auth', userRouter);
app.use('/matakuliah', mkRouter);
app.use('/type-nilai', typeNilaiRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/dosen', dosenRouter);
app.use('/kelas', kelasRouter);
app.use('/nilai', nilaiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})