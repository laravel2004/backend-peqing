import { MahasiswaCreateDto, MahasiswaCsvCreateDto } from "../dto/mahasiswa.create.dto";
import { MahasiswaRepository } from "../repositories/mahasiswa.repository";
import fs from "fs";
import { UserCreateDto } from "../../auth/dto/user.create.dto";
import { AuthRepository } from "../../auth/repositories/auth.repository";
import { hash } from "bcrypt";
import csv from 'csv-parser';
import { Mahasiswa } from "@prisma/client";
import { MahasiswaDto } from "../dto/mahasiswa.dto";
import { MahasiswaUpdateDto, MahasiswaUserUpdateDto } from "../dto/mahasiswa.update.dto";
import { UserDataDto } from "../../auth/dto/user.data.dto";
import * as jwt from "jsonwebtoken";

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
              const password = await hash(data.password, 10);
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

  async get() : Promise<MahasiswaDto[]> {
    try{
      const data = await this.mahasiswaRepository.get();
      return data.map((mahasiswa) => ({
        departement: mahasiswa.departement,
        id: mahasiswa.id,
        jurusan: mahasiswa.jurusan,
        nrp: mahasiswa.nrp,
        qr: mahasiswa.qr,
        userId: mahasiswa.userId,
        user : {
          email: mahasiswa.user.email,
          id: mahasiswa.user.id,
          name: mahasiswa.user.name
        }
      }));
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async update(update : MahasiswaUserUpdateDto) : Promise<MahasiswaUserUpdateDto> {
    try{
      const mahasiswa : MahasiswaUpdateDto = {
        id: update.id,
        jurusan: update.jurusan,
        departement: update.departement,
        nrp: update.nrp,
      }

      const user : UserDataDto = {
        email: update.user.email,
        id: update.user.id,
        name: update.user.name
      }

      const mahasiswaUpdated = await this.mahasiswaRepository.update(mahasiswa);
      if(mahasiswaUpdated) {
        const userUpdated = await this.authRepository.update(user);
        if(userUpdated) {
          return {
            departement: mahasiswaUpdated.departement,
            id: mahasiswaUpdated.id,
            jurusan: mahasiswaUpdated.jurusan,
            nrp: mahasiswaUpdated.nrp,
            userId: userUpdated.id,
            user : {
              email: userUpdated.email,
              id: userUpdated.id,
              name: userUpdated.name
            }
          }
        }
        throw new Error('User not found');
      }
      throw new Error('Mahasiswa not found');

    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) : Promise<Mahasiswa> {
    try{
      const data = await this.mahasiswaRepository.delete(id);
      if(data) {
        await this.authRepository.delete(data.userId);
        return data;
      }
      throw new Error('Mahasiswa not found');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async me (token : string) : Promise<MahasiswaUserUpdateDto> {
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const payload = decoded as { id: number };
      const data = await this.mahasiswaRepository.findByUserId(payload.id);
      if(!data) {
        throw new Error('User not found');
      }
      return {
        departement: data.departement,
        id: data.id,
        jurusan: data.jurusan,
        nrp: data.nrp,
        userId: data.userId,
        user : {
          email: data.user.email,
          id: data.user.id,
          name: data.user.name
        }
      }
    }
    catch(e : any) {
      throw new Error('Server Internal Error');
    }
  }
}