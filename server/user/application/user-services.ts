import { IDefaultUserRepository } from "../domain/repositories";
import { Pagination, UpdateUser, User } from "../domain/user.model";
import { defaultUserRepository } from "../infrastructure/user-repositories-impl";
import { IUserService } from "./services";

class UserServiceImpl implements IUserService {
  constructor(private UserRepository: IDefaultUserRepository) {}

  async updateUser(user: Partial<UpdateUser>): Promise<User> {
    return await this.UserRepository.updateUser(user);
  }

  async getById(userId: string): Promise<User> {
    const user = await this.UserRepository.getUserBy({ id: userId });
    const { password, ...rest } = user;
    return rest;
  }

  async getByEmailAuth(email: string): Promise<User> {
    const user= await this.UserRepository.getUserBy({ email });
    return user
  }

  async createUser(user: User): Promise<User> {
    return await this.UserRepository.createUser(user);
  }

  async getTotalCustomers(): Promise<{ totalUsers: string; }> {
    return this.UserRepository.getTotalCustomers()
  }

  async findOrCreateUser(user: User): Promise<User> {
    const userFound = await this.UserRepository.getUserBy({
      email: user.email,
    });

    if (!userFound) {
      return await this.UserRepository.createUser(user);
    }
    return userFound;
  }

  async getAllUsers(pagination: Pagination): Promise<User[]> {
    return this.UserRepository.getAllUsers(pagination)
  }
}

export const defaultUserService = new UserServiceImpl(defaultUserRepository);
