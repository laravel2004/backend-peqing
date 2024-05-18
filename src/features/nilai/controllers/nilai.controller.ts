import { Request, Response } from "express";
import { NilaiService } from "../services/nilai.service";
import { NilaiCreateDto } from "../dto/nilai.create.dto";

export class NilaiController {
  private readonly nilaiService : NilaiService;

  constructor() {
    this.nilaiService = new NilaiService();
  }

  async create(req: Request, res:Response) {
    try {
      const {nilai, mahasiswaId, typeNilaiId, kelasId} = req.body;
      if(!nilai || !mahasiswaId || !typeNilaiId || !kelasId) return res.status(400).json({
        status : "error",
        message : "field not completed"
      });
      const nilaiCreate : NilaiCreateDto = {
        ...req.body,
        grade : ''
      }

      const data = await this.nilaiService.create(nilaiCreate);

      return res.status(201).json({
        status : "succes",
        message : data
      })

    }
    catch(e) {
      return res.status(500).json({
        status : "error",
        message : (e as Error).message
      })
    }
  }
}