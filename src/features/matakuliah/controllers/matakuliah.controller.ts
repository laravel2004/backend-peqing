import { Request, Response } from "express";
import { MatakuliahService } from "../services/matakuliah.service";
import { MatakuliahUpdateDto } from "../dto/matakuliah.update.dto";

export class MatakuliahController {
  
  private readonly matakuliahService : MatakuliahService;

  constructor() {
    this.matakuliahService = new MatakuliahService();
  }

  async create(req:Request, res : Response){
    try{
      const matakuliah = await this.matakuliahService.create(req.body);
      return res.status(200).json({
        status : "succes",
        message : matakuliah
      })
    }
    catch(e:any) {
      return res.status(500).json({
        status : "error",
        message : e.message
      })
    }
  }

  async findId (req:Request, res:Response) {
    try{
      const {id} = req.params;
      const matakuliah = await this.matakuliahService.findId(Number(id));
      return res.status(200).json({
        status : "succes",
        message : matakuliah
      });
    }
    catch(e:any) {
      return res.status(500).json({
        status : "error",
        message : e.message
      })
    }
  }

  async getAll(req:Request, res:Response) {
    try{ 
      const data = await this.matakuliahService.get();
      return res.status(200).json({
        status : "succes",
        message : data
      })
    }
    catch(e:any) {
      return res.status(500).json({
        status : "error",
        message : e.message
      })
    }
  }

  async update (req:Request, res:Response) {
    try{
      const update : MatakuliahUpdateDto = {
        id : parseInt(req.params.id),
        name : req.body.name
      }
      const updated = await this.matakuliahService.update(update)
      return res.status(200).json({
        status : "succes",
        message : updated
      })
    }
    catch(e:any) {
      return res.status(500).json({
        status : "error",
        message : e.message
      })
    }
  }

  async delete(req:Request, res:Response) {
    try {
      const {id} = req.params;
      const deleted = await this.matakuliahService.delete(parseInt(id))
      return res.status(200).json({
        status : "succes",
        message : deleted
      })
     }
    catch(e:any) {
      return res.status(500).json({
        status : "error",
        message : e.message
      })
    }
  }
}