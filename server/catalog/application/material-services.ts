import { Material } from "../domain/material.model";
import { IMaterialRepository } from "../domain/repositories";
import { defaultMaterialRepository } from "../infrastructure/material-repositories";
import { IMaterialService } from "./service.definitions";

export class DefaultMaterialsServiceImpl implements IMaterialService{
  constructor(private materialsRepository: IMaterialRepository) {}

  async getAllMaterials(): Promise<Material[]> {
    return this.materialsRepository.getAllMaterials();
  }
}

export const DefaultMaterialService = new DefaultMaterialsServiceImpl(
    defaultMaterialRepository
);
