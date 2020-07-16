import { IDictionaryDAO , ITypeormService , MidwayApplication } from '../../../interface'
import { provide , inject } from 'midway'
import { EntitySchema } from 'typeorm/index'

/**
 * DictionaryDAO
 * 数据字典服务
 * @description 提供数据字典服务和功能
 */
@provide('DictionaryService')
export class DictionaryDAO implements IDictionaryDAO {

    app: MidwayApplication
    symbol: Symbol

    @inject('TypeormService')
    typeormService: ITypeormService

    add (doc: any , props: any): Promise<any> | void {
        return undefined
    }

    del (where: any , delTruly: boolean): Promise<any> | void {
        return undefined
    }

    get (where: any): Promise<any> | void {
        return undefined
    }

    async list (where: any) {
        let dictionaryRepo =
            await this.typeormService.getRepo(
                this.dictionaryEntity , true
            )

        const result = await dictionaryRepo.find()
        return result
    }

    modify (where: any , doc: any): Promise<any> | void {
        return undefined
    }

    async init (app: MidwayApplication): Promise<void> {
        this.app = app
    }

}
