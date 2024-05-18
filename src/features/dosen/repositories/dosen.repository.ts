import { Dosen, PrismaClient } from "@prisma/client";
import { DosenDto } from "../dto/dosen.dto";
import { DosenCreateDto } from "../dto/dosen.create.dto";
import { DosenUpdateDto } from "../dto/dosen.update.dto";

export class DosenRepository {

  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll () : Promise<DosenDto[]> {
    try {
      return await this.prisma.dosen.findMany({
        include: {
          user: true
        }
      });
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async create(dosen : DosenCreateDto) : Promise<Dosen> {
    try{
      return await this.prisma.dosen.create({
        data: dosen
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findId(id : number) : Promise<DosenDto> {
    try{
      const dosen = await this.prisma.dosen.findUnique({
        where: {
          id: id
        },
        include: {
          user: true
        }
      })

      if(!dosen) {
        throw new Error('Dosen not found');
      }
      return dosen
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async update(dosen : DosenUpdateDto) : Promise<Dosen> {
    try {
      return await this.prisma.dosen.update({
        where : {
          id : dosen.id
        },
        data : dosen
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) : Promise<Dosen> {
    try{
      return await this.prisma.dosen.delete({
        where : {
          id : id
        }
      })
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async findByUserId (id : number) : Promise<DosenDto> {
    try {
      const dosen = await this.prisma.dosen.findUnique({
        include: {
          user: true
        },
        where: {
          userId: id
        }
      })
      if(!dosen) {
        throw new Error('dosen not found');
      }
      return dosen
    } catch (e: any) {
      throw new Error("amada");
    }
  }

}