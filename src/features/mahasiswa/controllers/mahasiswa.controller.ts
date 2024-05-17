import { Request, Response } from "express";
import { MahasiswaService } from "../services/mahasiswa.service";

export class MahasiswaController {

  private readonly mahasiswaService : MahasiswaService;

  constructor() {
    this.mahasiswaService = new MahasiswaService();
  }

  async createMany(req:Request, res : Response) {
    try{
      console.log(req.file)
      if(!req.file) {
        return res.status(400).json({
          status : 'error',
          message : 'No file Uploaded'
        })
      }

      const data = await this.mahasiswaService.createMany(req.file.path);
      return res.status(200).json({
        status : 'success',
        message : data,
      })
    }
    catch(e:any) {
      return res.status(500).json({
        status : 'error',
        message : e.message
      })
    }
  }

  async findId(req : Request, res : Response) {
    try{
      const { id } = req.params
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.mahasiswaService.findId(Number(id));
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }
  

}