import { MahasiswaCreateDto, MahasiswaCsvCreateDto } from "../dto/mahasiswa.create.dto";
import { MahasiswaRepository } from "../repositories/mahasiswa.repository";
import fs from "fs";
import csvParser from "csv-parser";
import { UserCreateDto } from "../../auth/dto/user.create.dto";
import { AuthRepository } from "../../auth/repositories/auth.repository";
import { hash } from "bcrypt";
import csv from 'csv-parser';
import { Mahasiswa } from "@prisma/client";
import { MahasiswaDto } from "../dto/mahasiswa.dto";

export class MahasiswaService {

  private readonly mahasiswaRepository : MahasiswaRepository;
  private readonly authRepository : AuthRepository;

  constructor() {
    this.mahasiswaRepository = new MahasiswaRepository();
    this.authRepository = new AuthRepository();
  }

  async createMany(filePath: string): Promise<Mahasiswa[]> {
    const mahasiswas: MahasiswaCsvCreateDto[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          if (!data.nrp || !data.name || !data.email || !data.jurusan || !data.departement || !data.password) {
            return reject(new Error('Sebagian data tidak di save karena ada field yang kosong.'));
          }
          mahasiswas.push(data);
        })
        .on('end', async () => {
          try {
            const mahasiswasCreated: Mahasiswa[] = [];

            for (const data of mahasiswas) {
              const password = await hash(data.nrp, 10);
              const user: UserCreateDto = {
                name: data.name,
                email: data.email,
                password: password,
              };

              const userCreated = await this.authRepository.register(user);
              const qrGenerate = await hash(data.nrp, 10);
              const mahasiswa: MahasiswaCreateDto = {
                nrp: data.nrp,
                jurusan: data.jurusan,
                departement: data.departement,
                qr: qrGenerate,
                userId: userCreated.id,
              };

              const mahasiswaCreated = await this.mahasiswaRepository.create(mahasiswa);
              mahasiswasCreated.push(mahasiswaCreated);
            }

            fs.unlinkSync(filePath);
            resolve(mahasiswasCreated);
          } catch (e: any) {
            reject(new Error(e.message));
          }
        })
        .on('error', (e: any) => {
          reject(new Error(e.message));
        });
    });
  }

  async findId(id : number) : Promise<MahasiswaDto> {
    try{
      const data = await this.mahasiswaRepository.findId(id);
      return {
        departement: data.departement,
        id: data.id,
        jurusan: data.jurusan,
        nrp: data.nrp,
        qr: data.qr,
        userId: data.userId,
        user : {
          email: data.user.email,
          id: data.user.id,
          name: data.user.name
        }
        
      }
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }
}