import { compare, hash } from "bcrypt";
import { UserCreateDto } from "../dto/user.create.dto";
import { AuthRepository } from "../repositories/auth.repository";
import * as jwt from "jsonwebtoken";
import { UserShowDto } from "../dto/user.show.dto";
import { UserDataDto } from "../dto/user.data.dto";

export class AuthService {

  private readonly authRepository : AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(user : UserShowDto) : Promise<string> {
    try{
      const userExist = await this.authRepository.login(user.email);
      if(!userExist) {
        throw new Error('User not found');
      }
      const isMatch = await compare(user.password, userExist.password);
      if(!isMatch) {
        throw new Error('Password not match');
      }
      return jwt.sign({ id: userExist.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });  
    }
    catch(e) {
      throw new Error('Server Internal Error');
    }
  }

  async register(user : UserCreateDto) : Promise<string> {
    try{
      const hashPassword = await hash(user.password, 10);
      const newUser = await this.authRepository.register({ ...user, password: hashPassword });
      const token = jwt.sign({ id: newUser?.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      return token;
    }
    catch(e) {
      throw new Error('Server Internal Error');
    }
  }

  async me(token : string) : Promise<UserDataDto> {
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const payload = decoded as { id: number };
      const user = await this.authRepository.me(payload.id);
      return user;
    }
    catch(e) {
      throw new Error('Server Internal Error');
    }
  }

}