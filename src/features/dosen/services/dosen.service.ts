import { DosenCreateDto, DosenUserCreateDto } from "../dto/dosen.create.dto";
import { DosenRepository } from "../repositories/dosen.repository";
import fs from "fs";
import csv from 'csv-parser';
import { Dosen } from "@prisma/client";
import { hash } from "bcrypt";
import { UserCreateDto } from "../../auth/dto/user.create.dto";
import { AuthRepository } from "../../auth/repositories/auth.repository";
import { DosenDto } from "../dto/dosen.dto";
import { DosenUpdateDto, DosenUserUpdateDto } from "../dto/dosen.update.dto";
import { UserDataDto } from "../../auth/dto/user.data.dto";
import * as jwt from "jsonwebtoken";

export class DosenService {

  private readonly dosenRepository : DosenRepository;
  private readonly authRepository : AuthRepository;

  constructor() {
    this.dosenRepository = new DosenRepository();
    this.authRepository = new AuthRepository();
  }

  async createCsv(filePatch : string) {
    const dosens : DosenUserCreateDto[] = [];

    return new Promise(async (resolve, reject) => {
      fs.createReadStream(filePatch)
        .pipe(csv())
        .on('data', (data) => {
          if (!data.nip || !data.name || !data.email || !data.password) {
            return reject(new Error('Sebagian data tidak di save karena ada field yang kosong.'));
          }
          dosens.push(data);
        })
        .on('end', async() => {
          try{
            const dosensCreated :Dosen[] = [];
            for(const data of dosens) {
              const hashPassword = await hash(data.password, 10);
              const user : UserCreateDto = {
                email: data.email,
                name: data.name,
                password: hashPassword
              };
              const userCreated = await this.authRepository.register(user);
              const dosen : DosenCreateDto = {
                nip: data.nip,
                userId: userCreated.id
              };
              const dosenCreated = await this.dosenRepository.create(dosen);
              dosensCreated.push(dosenCreated);
            }

            fs.unlinkSync(filePatch);
            resolve(dosensCreated);
          }
          catch(e:any) {
            reject(new Error(e.message));
          }
        })
        .on('error', (error:any) => {
          reject(new Error(error.message));
        })
    });
  }

  async create(dosen : DosenUserCreateDto) : Promise<DosenDto> {
    try{
      const hashPassword = await hash(dosen.password, 10);
      const user : UserCreateDto = {
        email: dosen.email,
        name: dosen.name,
        password: hashPassword
      };
      const userCreated = await this.authRepository.register(user);
      const dosenCreated = await this.dosenRepository.create({
        nip: dosen.nip,
        userId: userCreated.id
      });
      return {
        nip: dosenCreated.nip,
        userId: dosenCreated.userId,
        user: {
          id: userCreated.id,
          name: userCreated.name,
          email: userCreated.email
        }
      }
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findId(id : number) : Promise<DosenDto> {
    try{
      const dosen = await this.dosenRepository.findId(id);
      return {
        nip: dosen.nip,
        userId: dosen.userId,
        user: {
          id: dosen.user.id,
          name: dosen.user.name,
          email: dosen.user.email
        }
      }
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async getAll () : Promise<DosenDto[]> {
    try{
      const dosens = await this.dosenRepository.getAll();
      return dosens.map((dosen) => {
        return {
          nip: dosen.nip,
          userId: dosen.userId,
          user: {
            id: dosen.user.id,
            name: dosen.user.name,
            email: dosen.user.email
          }
        }
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async update(dosen : DosenUserUpdateDto) : Promise<DosenUserUpdateDto> {
    try{
      const dosenUpdate : DosenUpdateDto = {
        id: dosen.id,
        nip: dosen.nip
      };
      const user: UserDataDto = {
        id : dosen.id,
        name : dosen.user.name,
        email : dosen.user.email
      }

      const dosenUpdated = await this.dosenRepository.update(dosenUpdate);
      if(dosenUpdated) {
        const userUpdated = await this.authRepository.update(user);
        if(userUpdated) {
          return {
            id: dosenUpdated.id,
            nip: dosenUpdated.nip,
            userId: userUpdated.id,
            user: {
              id: userUpdated.id,
              name: userUpdated.name,
              email: userUpdated.email
            }
          }
        }
        throw new Error('User not found');
      }
      throw new Error('Dosen not found');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) {
    try{
      const dosen = await this.dosenRepository.delete(id);
      if(dosen) {
        await this.authRepository.delete(id);
        return dosen;
      }
      throw new Error('Dosen not found');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async me(token : string) : Promise<DosenDto> {
    try{ 
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const payload = decoded as { id: number };
      const  data = await this.dosenRepository.findId(payload.id);
      if(!data) throw new Error("Dosen Not Founds")
      return {
        nip : data.nip,
        userId : data.userId,
        user : {
          name : data.user.name,
          email : data.user.email,
          id : data.user.id
        }
      }
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

}