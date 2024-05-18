import { PrismaClient } from "@prisma/client";
import { NilaiCreateDto } from "../dto/nilai.create.dto";
import { NilaiShowDto } from "../dto/nilai.show.dto";

export class NilaiRepository {
  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(nilai : NilaiCreateDto): Promise<NilaiShowDto> {
    try {
      const data = await this.prisma.nilai.create({
        data : nilai,
        include : {
          typeNilai : true,
          mahasiswa : {
            include : {
              user : true
            }
          },
        }
      });

      return {
        id : data.id,
        grade : data.grade,
        kelasId : data.kelasId,
        nilai : data.nilai,
        mahasiswa : {
          id : data.mahasiswa.id,
          userId : data.mahasiswa.user.id,
          name : data.mahasiswa.user.name
        },
        typeNilai : {
          id : data.typeNilai.id,
          name : data.typeNilai.name
        }
      }

    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  } 

}