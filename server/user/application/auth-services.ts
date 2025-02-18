import { IDefaultUserRepository } from "../domain/repositories";
import { User } from "../domain/user.model";
import { defaultUserRepository } from "../infrastructure/user-repositories-impl";
import { IAuthService } from "./services";

class AuthServiceImpl implements IAuthService {
  constructor(private userService: IDefaultUserRepository) {}

  async getByEmailAuth(email: string): Promise<User> {
    const user= await this.userService.getUserBy({ email });
    if (!user) throw new Error("email/Usuario no encontrado");
    return user
  }

  async register(userData:User): Promise<User> {
    return await this.userService.createUser(userData);
  }

  async getUserByEmailLocalProvider(email:string): Promise<User> {
   return await this.userService.getUserBy({
      email,
      provider:'local'
    });
  }

  async findOrCreateUser(user: User): Promise<User> {
    const userFound = await this.userService.getUserBy({
      email: user.email,
    });

    if (!userFound) {
      return await this.userService.createUser(user);
    }
    return userFound;
  }
}

export const defaultAuthService = new AuthServiceImpl(defaultUserRepository);
