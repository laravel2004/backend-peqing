import { NilaiCreateDto } from "../dto/nilai.create.dto";
import { NilaiShowDto } from "../dto/nilai.show.dto";
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

}