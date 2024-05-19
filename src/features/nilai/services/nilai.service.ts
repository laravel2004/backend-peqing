import { NilaiCreateDto } from "../dto/nilai.create.dto";
import { NilaiShowDto } from "../dto/nilai.show.dto";
import { NilaiUpdateDto } from "../dto/nilai.update.dto";
import { NilaiRepository } from "../repositories/nilai.repository";

export class NilaiService {

  private readonly nilaiRepository : NilaiRepository;

  constructor () {
    this.nilaiRepository = new NilaiRepository();
  }

  private genGrade(nilai : number) : string {
    if(nilai >= 85) return 'A'
    else if(nilai >= 75 ) return 'B'
    else if(nilai >= 65) return 'C'
    else if(nilai >= 55) return 'D'
    else return 'E'
  }

  async create(nilai : NilaiCreateDto) : Promise<NilaiShowDto> {
    try {
      const nilaiGrade = this.genGrade(nilai.nilai);
      nilai.grade = nilaiGrade;
      return await this.nilaiRepository.create(nilai);
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async findByMahasiswa (mahasiswaId : number, kelasId : number) : Promise<NilaiShowDto[]> {
    try {
      return await this.nilaiRepository.findByMahasiswa(mahasiswaId, kelasId);
    }
    catch(e) {
      throw new Error ((e as Error).message);
    }
  }

  async findByKelasId (kelasId : number) : Promise<NilaiShowDto[]> {
    try{
      return await this.nilaiRepository.findByKelasId(kelasId);
    }
    catch(e) {
      throw new Error((e as Error).message)
    }
  }

  async update(nilai : NilaiUpdateDto) : Promise<NilaiShowDto> {
    try{
      return await this.nilaiRepository.update(nilai);
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async delete(id : number) : Promise<NilaiShowDto> {
    try {
      return this.nilaiRepository.delete(id);
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

}