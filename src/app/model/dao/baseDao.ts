import { IBaseDao , ITypeormService , MidwayApplication } from '../../../interface'
import { inject , logger } from 'midway'

export declare type BaseDaoProps = {
    tableName?: string
}

/**
 * BaseDao 基础dao底层
 */
export class BaseDao implements IBaseDao {

    app: MidwayApplication
    symbol: Symbol
    tableName?: String

    @inject('typeormService')
    typeormService: ITypeormService

    @logger('appLogger')
    logger: any

    init (app: MidwayApplication): Promise<void> {
        return Promise.resolve(undefined)
    }

    add (doc: any , props?: any): Promise<any> | void {
        return undefined
    }

    del (where: any , delTruly?: boolean): Promise<any> | void {
        return undefined
    }

    get (where: any): Promise<any> | void {
        return undefined
    }

    list (where: any): Promise<any> | void {
        return undefined
    }

    modify (where: any , doc: any): Promise<any> | void {
        return undefined
    }

}
