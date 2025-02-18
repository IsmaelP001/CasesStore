import { rol, user } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { eq, sql } from "drizzle-orm";

export class AuthRepositoryImpl
  extends BaseRepository<typeof user, "user">
{
  constructor() {
    super(user, "user");
  }
   
}

export const defaultAuthRepository = new AuthRepositoryImpl();
