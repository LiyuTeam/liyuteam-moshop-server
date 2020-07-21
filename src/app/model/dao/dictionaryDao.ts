import { IDictionaryDao , MidwayApplication } from '../../../interface'
import { inject , provide } from 'midway'
import { BaseDao } from './baseDao'
import { IDictionaryEntity } from '../entities/mongodb/interface'

/**
 * DictionaryDAO
 * 数据字典服务
 * @description 提供数据字典服务和功能
 */
@provide('DictionaryDao')
export class DictionaryDao extends BaseDao implements IDictionaryDao {

    app: MidwayApplication
    symbol: Symbol

    @inject('DictionaryEntity')
    dictionaryEntity: IDictionaryEntity

    /**
     * 增加数据字典项
     * @param doc
     * @param props
     */
    async add (doc: any , props: any) {
        let dictionaryRepo = await this.typeormService.getRepo(
            'DictionaryEntity' , 'mongodb' , true
        )

        let result = await dictionaryRepo.create(
            Object.assign({} , this.dictionaryEntity , doc))

        this.logger.debug('DictionaryDao created is ok,' , result)
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
                'DictionaryEntity' , 'mongodb' , true
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
