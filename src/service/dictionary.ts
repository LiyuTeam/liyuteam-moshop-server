import {provide,Context, inject} from "midway";
import {BaseEntity, getRepository} from "typeorm/index";

@provide('DictionaryService')
export class DictionaryService {

    @inject() ctx:Context
    @inject('DictionaryEntity') DictionaryEntity:DictionaryEntityType

    async getDictionary() {
        const dictRepo = await getRepository(this.DictionaryEntity as BaseEntity)
    }

}