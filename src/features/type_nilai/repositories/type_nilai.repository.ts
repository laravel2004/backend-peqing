import { PrismaClient, TypeNilai } from "@prisma/client";
import { TypeNilaiCreateDto } from "../dto/type_nilai.create.dto";
import { TypeNilaiUpdateDto } from "../dto/type_nilai.update.dto";

export class TypeNilaiRepository {

  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() : Promise<TypeNilai[]> {
    try{
      return await this.prisma.typeNilai.findMany();
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findByMatakuliahId(matakuliahId : number) : Promise<TypeNilai[]> {
    try{
      const data = await this.prisma.typeNilai.findMany({
        where: {
          matakuliahId: matakuliahId
        }
      })

      if(!data) {
        throw new Error('TypeNilai not found');
      }
      return data;
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findId(id: number) : Promise<TypeNilai> {
    try{
      const data = await this.prisma.typeNilai.findUnique({
        where: {
          id: id
        }
      })
  
      if(!data) {
        throw new Error('TypeNilai not found');
      }
  
      return data;
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async create(typeNilai : TypeNilaiCreateDto) : Promise<TypeNilai> {
    try{
      const data = await this.prisma.typeNilai.create({
        data: typeNilai
      })
      return data;
    }
    catch(e : any) {
      throw new Error(e.message)
    } 
  }

  async update(update : TypeNilaiUpdateDto) : Promise<TypeNilai> {
    try {
      const data = await this.prisma.typeNilai.update({
        where: {
          id: update.id
        },
        data: update
      })
      return data;
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }
  
  async delete(id : number) : Promise<TypeNilai> {
    try {
      const data = await this.prisma.typeNilai.delete({
        where: {
          id: id
        }
      })
      return data;
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }




}