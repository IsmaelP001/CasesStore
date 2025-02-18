"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "../../../config/database/db";
import { user, rol } from "../../../config/database/schemes";

export const changeUserRol = async ({ newRol, userId }) => {
  try {
    const [data] = await db
      .update(user)
      .set({ rolId: sql`(SELECT id FROM rol WHERE rol = ${newRol})` })
      .where(eq(user.id, userId))
      .returning({ id: user.id, rol: user.rolId });
    
    return {userId:data?.id,rol:newRol};
  } catch (error) {
    console.log("error", error);
    throw new Error('Error al actualizar estatus')
  }
};
