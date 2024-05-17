import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/auth.route";
import mkRouter from "./routes/matakuliah.route";
import typeNilaiRouter from "./routes/type_nilai.route";
import mahasiswaRouter from "./routes/mahasiswa.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', userRouter);
app.use('/matakuliah', mkRouter);
app.use('/type-nilai', typeNilaiRouter);
app.use('/mahasiswa', mahasiswaRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})