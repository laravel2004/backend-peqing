import { Request, Response } from "express";
import { KelasService } from "../services/kelas.service";
import { KelasUpdateDto } from "../dto/kelas.update.dto";

export class KelasController {
  private readonly kelasService : KelasService;

  constructor() {
    this.kelasService = new KelasService();
  }

  async getAll (req: Request, res: Response) {
    try {
      const data = await this.kelasService.getAll();
      return res.status(200).json({
        status: "succes",
        message : data
      })
    }
    catch(e){
      return res.status(500).json({
        status : "error",
        message : (e as Error).message,
      })
    }
  }

  async getWithDosenMatakuliah (req: Request, res: Response) {
    try {
      const data = await this.kelasService.getWithDosenMatakuliah();
      return res.status(200).json({
        status : "succes",
        message : data
      })
    }
    catch(e) {
      return res.status(500).json({
        status : "error",
        message : (e as Error).message,
      })
    } 
  }

  async findWithDosenMatakuliah(req : Request, res : Response) {
    try {
      const {id} = req.params;
      const data = await this.kelasService.findWithDosenMatakuliah(Number(id));
      return res.status(200).json({
        satatus : "succes",
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

  async create(req: Request, res: Response) {
    try {
      const {matakuliahId, dosenId, name} = req.body;
      if(!matakuliahId || !dosenId || !name) return res.status(400).json({
        status : "error",
        message : "field not completed"
      })

      const data = await this.kelasService.create(req.body);
      return res.status(201).json({
        status : "succes",
        message : data
      })
    }
    catch(e) {
      return res.status(500).json({
        status : "error",
        message : (e as Error).message,
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const kelasUpdate : KelasUpdateDto = {
        ...req.body,
        id : Number(id)
      }

      const data = await this.kelasService.update(kelasUpdate);
      return res.status(200).json({
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

  async delete(req: Request, res:Response) {
    try {
      const {id} = req.params;
      const data = await this.kelasService.delete(Number(id));
      return res.status(200).json({
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