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
      throw new Error("Server Internal Error");
    }
  }

  async findByKelasId(kelasId : number) : Promise<TypeNilai[]> {
    try {
      return await this.prisma.typeNilai.findMany({
        where : {
          kelasId : kelasId
        }
      })
    }
    catch(e) {
      throw new Error("Server Internal Error")
    }
  }

  async create(tk : TypeNilaiCreateDto) : Promise<TypeNilai> {
    try{
      return await this.prisma.typeNilai.create({
        data : tk
      })
    }
    catch(e) {
      throw new Error("Server Internal Error")
    }
  }

  async update(tku : TypeNilaiUpdateDto) :Promise<TypeNilai> {
    try{
      console.log(tku)
      return await this.prisma.typeNilai.update({
        where : {
          id : tku.id
        },
        data : tku
      })
    }
    catch(e) {
      throw new Error("Server Internal Error");
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
      throw new Error("Server Internal Error");
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
      throw new Error("Server Internal Error");
    }
  }




}