import { color } from "@/config/database/schemes";
import { Color } from "../domain/color-model";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { IColorsRepository } from "../domain/repositories";

 class DefaultColorsRepositoryImpl extends BaseRepository<typeof color, "color">  implements IColorsRepository{
  constructor() {
    super(color, "color");
  }

  async getAllColors(): Promise<Color[]> {
    return this.getAll();
  }
}

export const defaultColorRepository= new DefaultColorsRepositoryImpl()