import { Collection, FilterCollection } from "../domain/collection.model";
import { defaultCollectionRepository } from "../infrastructure/collection-repositories";
import { ICollectionsService } from "./service.definitions";
import {ICollectionRepository} from '../domain/repositories'
export  class  CollectionsServiceImpl implements ICollectionsService{


    constructor(private collectionsRepository:ICollectionRepository
    ){
    }

    async getAllCollections(filter?:FilterCollection):Promise<Collection[]>{
        try {
            return await this.collectionsRepository.getAllCollections(filter)
        } catch (error) {
            console.log('error collections',error)
            throw new Error('Error al obtener colecciones')
        }
    }

}

export const defaultCollectionService= new CollectionsServiceImpl(defaultCollectionRepository)