import { TypeNilai } from "@prisma/client";
import { TypeNilaiRepository } from "../repositories/type_nilai.repository";
import { TypeNilaiCreateDto } from "../dto/type_nilai.create.dto";
import { TypeNilaiUpdateDto } from "../dto/type_nilai.update.dto";

export class TypeNilaiService {

  private readonly typeNilaiRepository : TypeNilaiRepository

  constructor() {
    this.typeNilaiRepository = new TypeNilaiRepository();
  }

  async get() : Promise<TypeNilai[]> {
    try{
      return await this.typeNilaiRepository.getAll();
    }
    catch(e : any) {
      throw new Error(e.message)
    }
  }

  async findId(id : number) : Promise<TypeNilai> {
    try{
      return await this.typeNilaiRepository.findId(id);
    }
    catch(e : any) {
      throw new Error(e.message)
    }
  }

  async findByKelasId(kelasId : number) : Promise<TypeNilai[]> {
    try {
      return await this.typeNilaiRepository.findByKelasId(kelasId);
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }

  async create(typeNilai : TypeNilaiCreateDto) : Promise<TypeNilai> {
    try{
      return await this.typeNilaiRepository.create(typeNilai);
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }

  async update(update : TypeNilaiUpdateDto) : Promise<TypeNilai> {
    try{
      return await this.typeNilaiRepository.update(update);
    }
    catch(e: any) {
      throw new Error(e.message);
    }
  }

  async delete(id : number) : Promise<TypeNilai> {
    try{
      return await this.typeNilaiRepository.delete(id);
    }
    catch(e : any) {
      throw new Error(e.message);
    }
  }
}