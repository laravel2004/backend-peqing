import { compare, hash } from "bcrypt";
import { UserCreateDto } from "../dto/user.create.dto";
import { AuthRepository } from "../repositories/auth.repository";
import * as jwt from "jsonwebtoken";
import { UserRoleDto, UserShowDto } from "../dto/user.show.dto";
import { UserDataDto } from "../dto/user.data.dto";
import { PrismaClient } from "@prisma/client";
import { UserDataRoleDto } from "../dto/user.role.dto";

export class AuthService {

  private readonly authRepository : AuthRepository;
  private readonly prisma : PrismaClient;

  constructor() {
    this.authRepository = new AuthRepository();
    this.prisma = new PrismaClient();
  }

  async login(user : UserShowDto) : Promise<UserRoleDto> {
    try{
      // console.log(user)
      const userExist = await this.authRepository.login(user.email);
      console.log(userExist)
      if(!userExist) {
        throw new Error('User not found');
      }
      const isMatch = await compare(user.password, userExist.password);
      console.log(isMatch)
      if(!isMatch) {
        throw new Error('Password not match');
      }

      const isMahasiswa = await this.prisma.mahasiswa.findUnique({
        where: {
          userId: userExist.id
        }
      })

      if(isMahasiswa) {
        return {
          token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
          role : 'mahasiswa'
        } ;
      }

      const isDosen = await this.prisma.dosen.findUnique({
        where: {
          userId: userExist.id
        }
      })
      
      if(isDosen) {
        return {
          token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
          role : 'dosen'
        } ;
      }

      return {
        token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
        role : 'admin'
      }
      
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async register(user : UserCreateDto) : Promise<UserRoleDto> {
    try{
      const hashPassword = await hash(user.password, 10);
      const userExist = await this.authRepository.register({ ...user, password: hashPassword });
      const isMahasiswa = await this.prisma.mahasiswa.findUnique({
        where: {
          userId: userExist.id
        }
      })

      if(isMahasiswa) {
        return {
          token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '36h' }),
          role : 'mahasiswa'
        } ;
      }

      const isDosen = await this.prisma.dosen.findUnique({
        where: {
          userId: userExist.id
        }
      })
      
      if(isDosen) {
        return {
          token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '36h' }),
          role : 'dosen'
        } ;
      }

      return {
        token : jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '36h' }),
        role : 'admin'
      }
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async me(token : string) : Promise<UserDataRoleDto> {
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const payload = decoded as { id: number };
      const user = await this.authRepository.me(payload.id);
      
      const isMahasiswa = await this.prisma.mahasiswa.findUnique({
        where: {
          userId: user.id
        }
      })

      if(isMahasiswa) {
        return {
          ...user,
          role : 'mahasiswa'
        } ;
      }

      const isDosen = await this.prisma.dosen.findUnique({
        where: {
          userId: user.id
        }
      })
      
      if(isDosen) {
        return {
          ...user,
          role : 'dosen'
        } ;
      }

      return {
        ...user,
        role : 'admin'
      }
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

}