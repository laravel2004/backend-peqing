import { Mahasiswa, PrismaClient } from "@prisma/client";
import { MahasiswaCreateDto } from "../dto/mahasiswa.create.dto";
import { MahasiswaDto } from "../dto/mahasiswa.dto";
import { MahasiswaUpdateDto, MahasiswaUserUpdateDto } from "../dto/mahasiswa.update.dto";

export class MahasiswaRepository {
  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get() : Promise<MahasiswaDto[]> {
    try {
      return await this.prisma.mahasiswa.findMany({
        include: {
          user: true
        }
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async create(mahasiswa : MahasiswaCreateDto ) : Promise<Mahasiswa> {
    try {
      return await this.prisma.mahasiswa.create({
        data: mahasiswa
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async findId(id : number) : Promise<MahasiswaDto> {
    try {
      const mahasiswa = await this.prisma.mahasiswa.findUnique({
        include: {
          user: true
        },
        where: {
          id: id
        }
      })
      if(!mahasiswa) {
        throw new Error('Mahasiswa not found');
      }
      return mahasiswa
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async update(mahasiswa : MahasiswaUpdateDto) : Promise<Mahasiswa> {
    try{
      return await this.prisma.mahasiswa.update({
        where: {
          id: mahasiswa.id
        },
        data: mahasiswa
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) : Promise<Mahasiswa> {
    try{
      return await this.prisma.mahasiswa.delete({
        where: {
          id: id
        }
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findByUserId (id : number) : Promise<MahasiswaUserUpdateDto> {
    try {
      const mahasiswa = await this.prisma.mahasiswa.findUnique({
        include: {
          user: true
        },
        where: {
          userId: id
        }
      })
      console.log(mahasiswa)
      if(!mahasiswa) {
        throw new Error('Mahasiswa not found');
      }
      return mahasiswa
    } catch (e: any) {
      throw new Error("afnjahbfaj");
    }
  }
}