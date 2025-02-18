
import {  material, printPattern } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Material } from "../domain/material.model";
import { IMaterialRepository, IPrintPatternRepository } from "../domain/repositories";
import { PrintPattern } from "../domain/printPattern-model";

 class PrintPatternRepositoryImpl extends BaseRepository<typeof printPattern,'printPattern'> implements IPrintPatternRepository{
    constructor(){
        super(printPattern,'printPattern')
    }

    async getAllPrintPattern():Promise<PrintPattern[]>{
        return this.getAll({
            columns:{
                id:true,
                name:true
            }
        })
    }
}

export const defaultPrintPatternRepository= new PrintPatternRepositoryImpl ()