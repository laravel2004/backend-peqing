import { Request, Response } from "express";
import { MahasiswaService } from "../services/mahasiswa.service";
import { MahasiswaUserUpdateDto } from "../dto/mahasiswa.update.dto";
import * as jwt from "jsonwebtoken";

export class MahasiswaController {

  private readonly mahasiswaService : MahasiswaService;

  constructor() {
    this.mahasiswaService = new MahasiswaService();
  }

  async create(req :Request,res :Response) {
    try {
      const {name, email, password, departement, jurusan, nrp} = req.body;
      if(!name || !email || !password || !departement || !jurusan || !nrp) return res.status(400).json({
        status : "error",
        message : "Field not completed"
      });

      const data = await this.mahasiswaService.create(req.body);
      return res.status(201).json({
        status : "succes",
        message : "Mahasiswa has created"
      })
    }
    catch(e:any) {
      return res.status(500).json ({
        status : "error",
        message : e.message
      })
    }
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
        message : "All mahasiswa has created"
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

  async getAll(req : Request, res : Response) {
    try{
      const data = await this.mahasiswaService.get();
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async delete(req : Request, res : Response) {
    try{
      const { id } = req.params
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.mahasiswaService.delete(Number(id));
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async update(req : Request, res : Response) {
    try{
      const { id } = req.params
      const mahasiswa : MahasiswaUserUpdateDto = {
        ...req.body,
        id : Number(id)
      }
      if(!id) return res.status(400).json({status : "error", message : "data not found"})
      const data = await this.mahasiswaService.update(mahasiswa);
      return res.status(200).json({status : "succes", message : data})
    }
    catch(e : any) {
      return res.status(500).json({status : "error", message : e.message})
    }
  }

  async me(req : Request, res : Response) {
    try{
      const headers = req.headers.authorization;
      console.log(headers)
      const token = headers?.split(" ")[1];
      console.log(token)
      const user = await this.mahasiswaService.me(token as string);
      return res.status(200).json({
        status : "success",
        message : user
      })
    }
    catch(e : any) {
      return res.status(500).json({
        message: e.message,
        status: "error"
      })
    }
  }
  

}