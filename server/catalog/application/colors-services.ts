import { Color } from "../domain/color-model";
import { IColorsRepository } from "../domain/repositories";
import { defaultColorRepository } from "../infrastructure/colors-repositories";
import { IColorsService } from "./service.definitions";

 class DefaultColorsServiceImpl implements IColorsService{
  constructor(private colorsRepository: IColorsRepository) {}

  async getAllColors(): Promise<Color[]> {
    return this.colorsRepository.getAllColors();
  }
}

export const DefaultColorService= new DefaultColorsServiceImpl(defaultColorRepository)