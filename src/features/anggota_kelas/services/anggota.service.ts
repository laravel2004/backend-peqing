import { AnggotaCreateDto } from "../dto/anggota.create.dto";
import { AnggotaShowDto } from "../dto/anggota.show.dto";
import { AnggotaUpdateDto } from "../dto/anggota.update.dto";
import { Anggotarepository } from "../repositories/anggota.repository";

export class AnggotaService {

  private readonly anggotaRepository : Anggotarepository;

  constructor() {
    this.anggotaRepository = new Anggotarepository();
  }

  async create(anggota : AnggotaCreateDto) : Promise<AnggotaShowDto> {
    try {
      return await this.anggotaRepository.create(anggota);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async update(anggota : AnggotaUpdateDto) : Promise<AnggotaShowDto> {
    try{
      return await this.anggotaRepository.update(anggota);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async delete(id : number) : Promise<AnggotaShowDto> {
    try{
      return await this.anggotaRepository.delete(id);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async findByKelasId (kelasId : number) : Promise<AnggotaShowDto[]> {
    try{
      return await this.anggotaRepository.findByKelasId(kelasId);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

}