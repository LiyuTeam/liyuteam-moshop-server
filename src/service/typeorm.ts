import { Application , config , provide } from 'midway'
import { ITypeormService } from '../interface'
import { Connection , EntitySchema , getConnection , getRepository , ObjectType , Repository } from 'typeorm/index'
import lodash from 'lodash'

export const SYMBOL = 'TypeormService'

@provide(SYMBOL)
class TypeormService implements ITypeormService {

    app: Application
    symbol: Symbol

    /**
     * 数据库配置
     * @description 来自于 config.local.ts 中的database配置项
     */
    @config('database')
    dbConfig: { clients: [{ type: string, name: string }] }

    async init (app: Application): Promise<void> {
        this.app = app
    }

    async getConn (clientName: string): Promise<Connection> {
        const clientConfig = lodash.findKey(this.dbConfig,)
        return getConnection(clientName)
    }

    getConnLazy (clientName: string): Function {
        return (cn: string) => this.getConn(cn)
    }

    async getRepo (entity: ObjectType<EntitySchema> , isMongo = false): Promise<Repository<any>> {
        return getRepository(entity)
    }

}

export default TypeormService
