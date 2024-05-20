import { PrismaClient, User } from "@prisma/client";
import { UserCreateDto } from "../dto/user.create.dto";
import { UserDataDto } from "../dto/user.data.dto";

export class AuthRepository {

  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login (email : string) : Promise<User> {
    try {
      const data =  await this.prisma.user.findUnique({
        where: {
          email: email,
        }
      })

      if(!data) {
        throw new Error('User not found');
      }

      return data
    }
    catch(e) {
      throw new Error((e as Error).message);
    }
  }

  async register (user : UserCreateDto) : Promise<User> {
    try {
      console.log(user)
      return await this.prisma.user.create({
        data: user
      })
    }
    catch(e:Error | any) {
      throw new Error("Server Internal Error");
    }
  }

  async me (id : number) : Promise<User> {
    try{
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })

      if(!user) {
        throw new Error('User not found');
      }

      return user;
    }
    catch(e) {
      throw new Error('Server Internal Error');
    }
  }

  async update(user : UserDataDto) : Promise<User> {
    try{
      return await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: user
      })
    }
    catch(e) {
      throw new Error('Server Internal Error');
    }
  }

  async delete(id : number) : Promise<User> {
    try{
      return await this.prisma.user.delete({
        where: {
          id: id
        }
      })
    }
    catch(e:any) {
      throw new Error("Server Internal Error");
    }
  }

}