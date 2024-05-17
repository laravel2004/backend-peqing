import { Mahasiswa, PrismaClient } from "@prisma/client";
import { MahasiswaCreateDto } from "../dto/mahasiswa.create.dto";
import { MahasiswaDto } from "../dto/mahasiswa.dto";

export class MahasiswaRepository {
  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get() : Promise<Mahasiswa[]> {
    try {
      return await this.prisma.mahasiswa.findMany();
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
}