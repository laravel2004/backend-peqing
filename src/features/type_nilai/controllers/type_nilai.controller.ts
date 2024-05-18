import { Request, Response } from "express";
import { TypeNilaiService } from "../services/type_nilai.service";
import { TypeNilaiUpdateDto } from "../dto/type_nilai.update.dto";

export class TypeNilaiController {

  private readonly typeNilaiService : TypeNilaiService;

  constructor() {
    this.typeNilaiService = new TypeNilaiService();
  }

  async getAll(req : Request, res : Response) {
    try{
      const data = await this.typeNilaiService.get();
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async findId(req : Request, res : Response) {
    try{
      const { id } = req.params
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.typeNilaiService.findId(Number(id));
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async findByKelasId(req : Request, res : Response) {
    try {
      const { id } = req.params
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.typeNilaiService.findByKelasId(Number(id));
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e:any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async create(req : Request, res : Response) {
    try{
      const { name, kelasId } = req.body
      if(!name || !kelasId) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.typeNilaiService.create(req.body);
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async update(req : Request, res : Response) {
    try {
      const { name, kelasId } = req.body
      const { id } = req.params;
      if(!id || !name) return res.status(400).json({status : "error", message : "data not found"})

      const update : TypeNilaiUpdateDto = {
        id : Number(id),
        name : name,
      }
      
      const data = await this.typeNilaiService.update(update);
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e:any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async delete(req : Request, res : Response) {
    try {
      const { id } = req.params
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.typeNilaiService.delete(Number(id));
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e:any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

}