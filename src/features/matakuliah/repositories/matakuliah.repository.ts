import { Matakuliah, PrismaClient } from "@prisma/client";
import { MatakuliahCreateDto } from "../dto/matakuliah.create.dto";
import { MatakuliahUpdateDto } from "../dto/matakuliah.update.dto";

export class MatakuliahRepository {

  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get() : Promise<Matakuliah[]> {
    try{
      return await this.prisma.matakuliah.findMany();
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }

  async findId(id : number) : Promise<Matakuliah> {
    try{
      const data = await this.prisma.matakuliah.findUnique({
        where: {
          id: id
        }
      });
      if(!data) {
        throw new Error('Matakuliah not found');
      }
      return data;
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }

  async create (mt : MatakuliahCreateDto) : Promise<Matakuliah> {
    try{
      const data = await this.prisma.matakuliah.create({
        data: mt
      });
      return data;
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }

  async update (mtu : MatakuliahUpdateDto) : Promise<Matakuliah> {
    try{
      return await this.prisma.matakuliah.update({
        where: {
          id: mtu.id
        },
        data: mtu
      });
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }

  async delete (id : number) : Promise<Matakuliah> {
    try{
      return await this.prisma.matakuliah.delete({
        where: {
          id: id
        }
      })
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }


}