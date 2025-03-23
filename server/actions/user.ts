'use server'
import { getUserSession } from "@/lib/auth";
import { authServiceFacade, userServiceFacade } from "../user/application";

export const getSessionUserId =async()=>{
    const session = await getUserSession();
    return session ? session?.user?.id : undefined;
}
export const createUser = async (input:any) => {
  return await authServiceFacade.register({ ...input, provider: "local" });
};

export const updateUser = async (input:any, userId: string) => {
  return await userServiceFacade.updateUser({ ...input, userId });
};

export const getUser = async (userId: string) => {
  return await userServiceFacade.getUserById(userId!);
};

export const getAllUsers = async (limit?: number) => {
  return await userServiceFacade.getAllUsers({ limit });
};

export const getTotalCustomers = async () => {
  return await userServiceFacade.getTotalCustomers();
};