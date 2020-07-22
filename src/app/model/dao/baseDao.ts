import { ITypeormService , MidwayApplication } from '../../../interface'
import { inject , logger } from 'midway'

export declare type BaseDaoProps = {
    tableName?: string
}

/**
 * BaseDao 基础dao底层
 */
export class BaseDao {

    app: MidwayApplication
    symbol: Symbol
    tableName?: String

    @inject('typeormService')
    typeormService: ITypeormService

    @logger('appLogger')
    logger: any
}
