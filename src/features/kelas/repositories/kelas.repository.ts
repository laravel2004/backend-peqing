import { Kelas, PrismaClient } from "@prisma/client";
import { KelasShowDto } from "../dto/kelas.show.dto";
import { KelasCreateDto } from "../dto/kelas.create.dto";
import { KelasUpdateDto } from "../dto/kelas.update.dto";

export class KelasRepository {
  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll () : Promise<Kelas[]> {
    try {
      return await this.prisma.kelas.findMany();
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async findWithDosenMatakuliah (id : number) : Promise<KelasShowDto> {
    try {
      const kelas = await this.prisma.kelas.findUnique({
        where : {
          id : id
        },
        include : {
          dosen : {
            include : {
              user : true
            },
          },
          matakuliah : true
        }
      })

      if(!kelas) throw new Error("Kelas not founds")

      return kelas
    }
    catch(e) {
      throw new Error((e as Error).message);
    } 
  }

  async getWithDosenMatakuliah () : Promise<KelasShowDto[]> {
    try {
      const kelas = await this.prisma.kelas.findMany({
        include : {
          matakuliah : true,
          dosen : {
            include : {
              user : true
            }
          }
        }
      })

      if(!kelas) throw new Error('data not founds');

      return kelas
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async create (kelas : KelasCreateDto) : Promise<KelasShowDto> {
    try {
      const data = await this.prisma.kelas.create({
        data : kelas,
        include : {
          matakuliah : true,
          dosen : {
            include : {
              user : true
            }
          }
        },
      })
      return {
        id : data.id,
        name : data.name,
        matakuliah : {
          id : data.matakuliah.id,
          name : data.matakuliah.name
        },
        dosen : {
          id : data.dosen.id,
          nip : data.dosen.nip,
          user : {
            name : data.dosen.user.name,
            email : data.dosen.user.email,
            id : data.dosen.user.id
          }
        }
      }
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async update(kelas : KelasUpdateDto) : Promise<KelasShowDto> {
    try {
      const data = await this.prisma.kelas.update({
        where : {
          id : kelas.id
        },
        data : kelas,
        include : {
          matakuliah : true,
          dosen : {
            include : {
              user : true
            }
          }
        },
      })
  
      return {
        id : data.id,
        name : data.name,
        matakuliah : {
          id : data.matakuliah.id,
          name : data.matakuliah.name
        },
        dosen : {
          id : data.dosen.id,
          nip : data.dosen.nip,
          user : {
            name : data.dosen.user.name,
            email : data.dosen.user.email,
            id : data.dosen.user.id
          }
        }
      }
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id : number) : Promise<KelasShowDto> {
    try {
      const data = await this.prisma.kelas.delete({
        where : {
          id : id
        },
        include : {
          matakuliah : true,
          dosen : {
            include : {
              user : true
            }
          }
        },
      })
  
      return {
        id : data.id,
        name : data.name,
        matakuliah : {
          id : data.matakuliah.id,
          name : data.matakuliah.name
        },
        dosen : {
          id : data.dosen.id,
          nip : data.dosen.nip,
          user : {
            name : data.dosen.user.name,
            email : data.dosen.user.email,
            id : data.dosen.user.id
          }
        }
      }
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

}