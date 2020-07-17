import { IDictionaryDao , ITypeormService , MidwayApplication } from '../../../interface'
import { provide , inject } from 'midway'

/**
 * DictionaryDAO
 * 数据字典服务
 * @description 提供数据字典服务和功能
 */
@provide('dictionaryDao')
export class DictionaryDao implements IDictionaryDao {

    app: MidwayApplication
    symbol: Symbol

    @inject('TypeormService')
    typeormService: ITypeormService

    async add (doc: any , props: any) {
        let dictionaryRepo =
            await this.typeormService.getRepo(
                'sys_dictionary' , 'mongodb' , true
            )

        const result = await dictionaryRepo.create(doc)
        return result
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
                'sys_dictionary' , 'mongodb' , true
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
