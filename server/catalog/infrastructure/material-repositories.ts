
import {  material } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Material } from "../domain/material.model";
import { IMaterialRepository } from "../domain/repositories";

 class DefaultMaterialRepositoryImpl extends BaseRepository<typeof material,"material"> implements IMaterialRepository{
    constructor(){
        super(material,'material')
    }

    async getAllMaterials():Promise<Material[]>{
        return this.getAll({
            columns:{
                id:true,
                name:true
            }
        })
    }
}

export const defaultMaterialRepository= new DefaultMaterialRepositoryImpl()