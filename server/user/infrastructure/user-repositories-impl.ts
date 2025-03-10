import {  user } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Pagination, UpdateUser, User } from "../domain/user.model";
import { IDefaultUserRepository } from "../domain/repositories";
import { eq, sql } from "drizzle-orm";

export class UserRepositoryImpl
  extends BaseRepository<typeof user, "user">
  implements IDefaultUserRepository
{
  constructor() {
    super(user, "user");
  }

  async getUserBy(filter: Partial<User>): Promise<User> {
    const data = await this.getFirst({
      filter: filter,
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password:true,
        phonenumber: true,
        createdAt: true,
        updatedAt: true,
        rol: true,
      },
    });
    return data as User;
  }

  async getAllUsers(pagination: Pagination): Promise<User[]> {
    const data = await this.getAll({
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phonenumber: true,
        createdAt: true,
        updatedAt: true,
        rol: true,
      },
      limit:(pagination?.limit || 10)
    });
    return data as User[];
  }

  async updateUser(user: Partial<UpdateUser>): Promise<User> {
    const { userId, ...userData } = user;
    const [data] = await this.update({
      input: userData,
      filter: { id: userId },
    });

    return data as User;
  }

  async createUser(user: User): Promise<User> {
    try {
      const [newUser] = await this.create(user);
      return newUser as User;
    } catch (error) {
      throw new Error("error creating user" + error);
    }
  }

  async getTotalCustomers(): Promise<{ totalUsers: string }> {
    const [data] = await this.db
      .select({
        totalUsers: sql`count(${user.id})`,
      })
      .from(user);
    return data
  }
}

export const defaultUserRepository = new UserRepositoryImpl();
