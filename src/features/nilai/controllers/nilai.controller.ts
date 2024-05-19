import { Request, Response } from "express";
import { NilaiService } from "../services/nilai.service";
import { NilaiCreateDto } from "../dto/nilai.create.dto";
import { NilaiUpdateDto } from "../dto/nilai.update.dto";

export class NilaiController {
  private readonly nilaiService : NilaiService;

  constructor() {
    this.nilaiService = new NilaiService();
  }

  async create(req: Request, res:Response) {
    try {
      const {nilai, mahasiswaId, typeNilaiId} = req.body;
      const {kelasId} = req.params;
      if(!nilai || !mahasiswaId || !typeNilaiId || !kelasId) return res.status(400).json({
        status : "error",
        message : "field not completed"
      });
      const nilaiCreate : NilaiCreateDto = {
        ...req.body,
        kelasId : Number(kelasId),
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

  async findByMahasiswa(req:Request, res : Response) {
    try {
      const {kelasId, mahasiswaId} = req.params

      const response = await this.nilaiService.findByMahasiswa(Number(mahasiswaId), Number(kelasId));
      return res.status(200).json({
        status : "succes",
        message : response
      })

    }
    catch(e) {
      return res.status(500).json({
        status : "error",
        message : (e as Error).message
      })
    }

  }
  async findByKelasId(req: Request, res: Response) {
    try{
      const {kelasId} = req.params
      const response = await this.nilaiService.findByKelasId(Number(kelasId));
      return res.status(200).json({
        status : "succes",
        message : response
      })
    }
    catch(e) {
      return res.status(500).json({
        status : 'error',
        message : (e as Error).message
      })
    }
  }

  async update (req: Request, res : Response) {
    try {
      const {id, kelasId} = req.params;
      const {nilai, grade, typeNilaiId, mahasiswaId} = req.body
      if(!id) return res.status(400).json({
        status : "error",
        message : "data not founds"
      })

      const update : NilaiUpdateDto = {
        ...req.body,
        kelasId : kelasId,
        id : id
      }

      const response = await this.nilaiService.update(update);
      return res.status(200).json({
        status : 'succes',
        message : response
      })
    }
    catch(e) {
      return res.status(500).json({
        status : 'error',
        message : (e as Error).message
      })
    }
  }

  async delete (req: Request, res:Response) {
    try {
      const {id} = req.params;
      const response = await this.nilaiService.delete(Number(id));
      return res.status(200).json({
        status : 'succes',
        message : response
      })
    }
    catch(e) {
      return res.status(500).json({
        status : 'error',
        message : (e as Error).message
      })
    }
  }
}