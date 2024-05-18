import { Request, Response } from "express";
import { DosenService } from "../services/dosen.service";
import { DosenUserUpdateDto } from "../dto/dosen.update.dto";

export class DosenController {
  private readonly dosenService : DosenService;

  constructor() {
    this.dosenService = new DosenService();
  }

  async createMany(req : Request, res : Response) {
    try{
      if(!req.file) {
        return res.status(400).json({status : "error", message : "No file Uploaded"})
      }
      const data = await this.dosenService.createCsv(req.file.path);
      res.status(200).json({status : "success", message : "All Dosen has created"})
    }
    catch(e) {
      res.status(500).json({status : "error", message : (e as Error).message})
    }
  }

  async create(req : Request, res : Response) {
    try{
      const {name, email, password, nip} = req.body;
      if(!name || !email || !password || !nip) return res.status(400).json({
        status : "error",
        message : "field not complete"
      })
      await this.dosenService.create(req.body);
      return res.status(201).json({
        status : "succes",
        message : "Dosen has created"
      });
    }
    catch(e) {
      res.status(500).json({status : "error", message : (e as Error).message})
    }
  }

  async update(req:Request, res:Response) {
    try {
      const {id} = req.params;
      const dosen : DosenUserUpdateDto = {
        ...req.body,
        id : Number(id)
      }
      if(!id) return res.status(400).json({
        status : "error",
        message : "data not found"
      })
      const data = await this.dosenService.update(dosen);
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
      if(!id) return res.status(400).json({
        status : "error",
        message: "dosen not founds"
      })
      const data = await this.dosenService.delete(Number(id));
      return res.status(200).json({
        status : "error",
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

  async me (req : Request, res : Response) {
    try{
      const header = req.headers.authorization;
      console.log(header)
      const token = header?.split(" ")[1];
      const data = await this.dosenService.me(token as string);
      return res.status(200).json({
        status : "succes",
        message : data
      })
    }
    catch(e) {
      return res.status(500).json({
        status : "error",
        message : (e  as Error).message
      })
    } 
  }

  async getAll (req:Request, res:Response) {
    try {
      const data = await this.dosenService.getAll();
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

  async findId(req:Request, res:Response) {
    try {
      const {id} = req.params;
      const data = await this.dosenService.findId(Number(id));
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