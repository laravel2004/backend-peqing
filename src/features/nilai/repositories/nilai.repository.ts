import { PrismaClient } from "@prisma/client";
import { NilaiCreateDto } from "../dto/nilai.create.dto";
import { NilaiShowDto } from "../dto/nilai.show.dto";
import { NilaiUpdateDto } from "../dto/nilai.update.dto";

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

  async findByMahasiswa (mahasiswaId : number, kelasId : number) : Promise<NilaiShowDto[]> {
    try{
      const data = await this.prisma.nilai.findMany({
        where : {
          AND : [
           {
            mahasiswaId : mahasiswaId,
           },
           {
            kelasId : kelasId
           }
          ]
        },
        include : {
          mahasiswa : {
            include : {
              user : true
            }
          },
          typeNilai : true
        }
      })

      return data.map((nilai) => ({
        id : nilai.id,
        grade : nilai.grade,
        nilai : nilai.nilai,
        kelasId : nilai.kelasId,
        mahasiswa : {
          id : nilai.mahasiswa.id,
          name : nilai.mahasiswa.user.name,
          userId : nilai.mahasiswa.userId
        },
        typeNilai : {
          id : nilai.typeNilaiId,
          name : nilai.typeNilai.name
        }
      }))
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async findByKelasId(kelasId : number) : Promise<NilaiShowDto[]> {
    try{
      const data = await this.prisma.nilai.findMany({
        where : {
          kelasId : kelasId
        },
        include : {
          mahasiswa : {
            include : {
              user : true
            }
          },
          typeNilai : true
        }
      })

      return data.map((nilai) => ({
        id : nilai.id,
        grade : nilai.grade,
        nilai : nilai.nilai,
        kelasId : nilai.kelasId,
        mahasiswa : {
          id : nilai.mahasiswa.id,
          name : nilai.mahasiswa.user.name,
          userId : nilai.mahasiswa.userId
        },
        typeNilai : {
          id : nilai.typeNilaiId,
          name : nilai.typeNilai.name
        }
      }))
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async update(nilai : NilaiUpdateDto) : Promise<NilaiShowDto> {
    try {
      const data = await this.prisma.nilai.update({
        where : {
          id : nilai.id
        },
        data : nilai,
        include : {
          mahasiswa : {
            include : {
              user : true
            }
          },
          typeNilai : true
        }
      })

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
      throw new Error((e as Error).message)
    }
  }

  async delete (id : number) : Promise<NilaiShowDto> {
    try{
      const data = await this.prisma.nilai.delete({
        where : {
          id: id
        }, 
        include : {
          mahasiswa : {
            include : {
              user : true
            }
          },
          typeNilai : true
        }
      })

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
      throw new Error((e as Error).message)
    }
  }

}