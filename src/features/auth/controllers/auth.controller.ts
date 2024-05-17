import { PrismaClient } from "@prisma/client";
import { UserCreateDto } from "../dto/user.create.dto";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {

  private readonly authService : AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login (req:Request, res:Response) {
    try{
      const { email, password } = req.body;
      const token = await this.authService.login({ email, password });
      return res.status(200).json({
        message: token,
        status: "success",
      })
    }
    catch(e:any) {
      return res.status(500).json({
        message: e.message,
        status: "error"
      })
    }
    
  }

  async register (req:Request, res:Response) {
    try{
      const { email, password, name } = req.body;
      if(email && password && name) {
        console.log(req.body)
        const token = await this.authService.register({ email, password, name });
        console.log(token)
        return res.status(200).json({
          message: token,
          status: "success",
        })
      }
      return res.status(404).json({
        message: "Data not found",
        status: "error"
      })
    }
    catch(e : any) {
      return res.status(500).json({
        message: e.message,
        status: "error"
      })
    }
  }

  async me (req:Request, res:Response) {
    try{
      const headers = req.headers.authorization;
      const token = headers?.split(" ")[1];
      const user = await this.authService.me(token as string);
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