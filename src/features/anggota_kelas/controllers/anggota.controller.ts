import { Request, Response } from "express";
import { AnggotaService } from "../services/anggota.service";
import { AnggotaUpdateDto } from "../dto/anggota.update.dto";

export class AnggotaController {

  private readonly anggotaService : AnggotaService;

  constructor() {
    this.anggotaService = new AnggotaService();
  }

  async create(req: Request, res: Response) {
    try {
      const {mahasiswaId, kelasId} = req.body
      if(!mahasiswaId || !kelasId) return res.status(400).json({
        status: "error",
        message: "field not completed"
      })
      const data = await this.anggotaService.create(req.body)
      return res.status(201).json({
        status: "succes",
        message: data
      })
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: (e as Error).message
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {id} = req.params
      if(!id) return res.status(400).json({
        status: "error",
        message: "field not completed"
      })

      const updated : AnggotaUpdateDto = {
        ...req.body,
        id : Number(id)
      }

      const data = await this.anggotaService.update(updated)
      return res.status(200).json({
        status: "succes",
        message: data
      })
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: (e as Error).message
      })
    }
  }

  async delete(req: Request, res: Response) {
    try{
      const {id} = req.params
      if(!id) return res.status(400).json({
        status: "error",
        message: "field not completed"
      })
      const data = await this.anggotaService.delete(Number(id))
      return res.status(200).json({
        status: "succes",
        message: data
      })
    }
    catch(e) {
      return res.status(500).json({
        status: "error",
        message: (e as Error).message
      })
    }
  }

  async findKelasId(req: Request, res: Response) {
    try{
      const {id} = req.params
      if(!id) return res.status(400).json({
        status: "error",
        message: "field not completed"
      })
      const data = await this.anggotaService.findByKelasId(Number(id))
      return res.status(200).json({
        status: "succes",
        message: data
      })
    }
    catch(e) {
      return res.status(500).json({
        status: "error",
        message: (e as Error).message
      })
    }
  }

}