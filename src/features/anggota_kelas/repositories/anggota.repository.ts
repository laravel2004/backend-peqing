import { PrismaClient } from "@prisma/client";
import { AnggotaCreateDto } from "../dto/anggota.create.dto";
import { AnggotaShowDto } from "../dto/anggota.show.dto";
import { AnggotaUpdateDto } from "../dto/anggota.update.dto";

export class Anggotarepository {

  private readonly prisma : PrismaClient;

  constructor () {
    this.prisma  = new PrismaClient();
  }

  convertResponse(anggota : AnggotaShowDto) : AnggotaShowDto {
    return {
      id : anggota.id,
      kelas : {
        id : anggota.kelas.id,
        name : anggota.kelas.name,
        matakuliah : {
          id : anggota.kelas.matakuliah.id,
          name : anggota.kelas.matakuliah.name
        }
      },
      mahasiswa : {
        id : anggota.mahasiswa.id,
        departement : anggota.mahasiswa.departement,
        jurusan : anggota.mahasiswa.jurusan,
        nrp : anggota.mahasiswa.nrp,
        user : {
          id : anggota.mahasiswa.user.id,
          name : anggota.mahasiswa.user.name
        }
      }
    }

  }

  async create(anggota : AnggotaCreateDto) : Promise<AnggotaShowDto> {
    try {
      const data = await this.prisma.anggotaKelas.create({
        data : anggota,
        include : {
          kelas : {
            include : {
              matakuliah : true
            }
          },
          mahasiswa : {
            include : {
              user : true
            }
          }
        }
      })
      return this.convertResponse(data);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async update (anggota : AnggotaUpdateDto) : Promise<AnggotaShowDto> {
    try {
      const data = await this.prisma.anggotaKelas.update({
        where : {
          id : anggota.id
        },
        data : anggota,
        include : {
          kelas : {
            include : {
              matakuliah : true
            }
          },
          mahasiswa : {
            include : {
              user : true
            }
          }
        }
      })
      return this.convertResponse(data);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id : number) : Promise<AnggotaShowDto>  {
    try {
      const data = await this.prisma.anggotaKelas.delete({
        where : {
          id : id
        },
        include : {
          kelas : {
            include : {
              matakuliah : true
            }
          },
          mahasiswa : {
            include : {
              user : true
            }
          }
        }
      })
      return this.convertResponse(data);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async findByKelasId(kelasId : number) : Promise<AnggotaShowDto[]> {
    try {
      const data = await this.prisma.anggotaKelas.findMany({
        where : {
          kelasId : kelasId
        },
        include : {
          kelas : {
            include : {
              matakuliah : true
            }
          },
          mahasiswa : {
            include : {
              user : true
            }
          }
        }
      })
      return data.map((anggota) => this.convertResponse(anggota));
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

}