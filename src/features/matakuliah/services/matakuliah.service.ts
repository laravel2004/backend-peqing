import { MatakuliahCreateDto } from "../dto/matakuliah.create.dto";
import { MatakuliahUpdateDto } from "../dto/matakuliah.update.dto";
import { MatakuliahRepository } from "../repositories/matakuliah.repository";

export class MatakuliahService {
  private readonly matakuliahRepository : MatakuliahRepository;

  constructor() {
    this.matakuliahRepository = new MatakuliahRepository();
  }

  async get() {
    try {
      return  await this.matakuliahRepository.get();
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }

  async findId(id : number) {
    try {
      return  await this.matakuliahRepository.findId(id);
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }

  async create(mt : MatakuliahCreateDto) {
    try{
      const data = await this.matakuliahRepository.create(mt);
      console.log(data);
      return data
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async update(mtu : MatakuliahUpdateDto) {
    try{
      return  await this.matakuliahRepository.update(mtu);
    } 
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) {
    try{
      return await this.matakuliahRepository.delete(id);
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

}