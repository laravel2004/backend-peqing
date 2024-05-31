import { Kelas } from "@prisma/client";
import { KelasRepository } from "../repositories/kelas.repository";
import { KelasShowDto } from "../dto/kelas.show.dto";
import { KelasUpdateDto } from "../dto/kelas.update.dto";
import { KelasCreateDto } from "../dto/kelas.create.dto";

export class KelasService {
  private readonly kelasRepository : KelasRepository;

  constructor() {
    this.kelasRepository = new KelasRepository();
  }

  async getAll() : Promise<Kelas[]> {
    try{
      return await this.kelasRepository.getAll();
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async findWithDosenMatakuliah (id : number) : Promise<KelasShowDto> {
    try {
      const kelas = await this.kelasRepository.findWithDosenMatakuliah(id);
      return {
        id : kelas.id,
        name : kelas.name,
        dosen : {
          id : kelas.dosen.id,
          nip : kelas.dosen.nip,
          user : {
            id : kelas.dosen.user.id,
            name : kelas.dosen.user.name,
            email : kelas.dosen.user.email
          }
        }
      }
      
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async getWithDosenMatakuliah() : Promise<KelasShowDto[]> {
    const data = await this.kelasRepository.getWithDosenMatakuliah();
    return data.map((kelas) => ({
      id : kelas.id,
        name : kelas.name,
        dosen : {
          id : kelas.dosen.id,
          nip : kelas.dosen.nip,
          user : {
            id : kelas.dosen.user.id,
            name : kelas.dosen.user.name,
            email : kelas.dosen.user.email
          }
        }
    }))
  }

  async update(kelas : KelasUpdateDto) : Promise<KelasShowDto> {
    try {
      return await this.kelasRepository.update(kelas);
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async delete(id : number) : Promise<KelasShowDto> {
    try{
      return await this.kelasRepository.delete(id);
    }
    catch(e) {
      throw new Error((e as Error).message);
    } 
  }

  async create(kelas : KelasCreateDto) : Promise<KelasShowDto> {
    try {
      return await this.kelasRepository.create(kelas);
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }
}