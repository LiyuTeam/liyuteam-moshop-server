import {Inject, Service} from "typedi"
import {IDictionaryService, ITypeormService, MidwayApplication} from "../interface";
import {IModel} from 'egg'

/**
 * DictionaryService
 * 数据字典服务
 * @description 提供数据字典服务和功能
 */
@Service()
export class DictionaryService implements IDictionaryService {

    app: MidwayApplication;
    symbol: Symbol;


    @Inject('typeormService')
    typeormService: ITypeormService

    @Inject('dictionaryEntity')
    dictionaryEntity: IModel["Entities"]["Mongodb"]["Dictionary"]["DictionaryEntity"]

    add(doc: any, props: any): Promise<any> | void {
        return undefined;
    }

    del(where: any, delTruly: boolean): Promise<any> | void {
        return undefined;
    }

    get(where: any): Promise<any> | void {
        return undefined;
    }

    async list(where: any) {
        let dictionaryRepo = await this.typeormService.getRepo(
            this.dictionaryEntity, true
        );

        const result = await dictionaryRepo.find();
        return result;
    }

    modify(where: any, doc: any): Promise<any> | void {
        return undefined;
    }

    async start(app: MidwayApplication): Promise<void> {
        this.app = app;
    }

}
