import { Application , config , provide , logger } from 'midway'
import { ITypeormService } from '../interface'
import {
    Connection , ConnectionOptions ,
    createConnection ,
    EntitySchema ,
    getMongoRepository ,
    getRepository ,
    ObjectType ,
    Repository
} from 'typeorm/index'

export const SYMBOL = 'TypeormService'

@provide(SYMBOL)
class TypeormService implements ITypeormService {

    app: Application
    symbol: Symbol

    @logger('logger')
    logger: any
    /**
     * 数据库配置
     * @description 来自于 config.local.ts 中的database配置项
     */
    @config('database')
    dbConfig: { clients: ConnectionOptions[] }
    connections = new Map() as Map<string , Connection>

    async init (app: Application): Promise<void> {
        this.app = app

        this.dbConfig.clients.map(async c => {
            this.connections.set(c.name as string , await createConnection(c).then(res => {
                this.logger.log(`Create connection [${c.name}], connect type is ${c.type}`)
                return res
            }))
        })
    }


    /**
     * 获取 Repo
     * @param entity
     * @param connectName
     * @param isMongo
     */
    async getRepo (entity: ObjectType<EntitySchema> , connectName = 'default' , isMongo = false): Promise<Repository<any>> {
        if (isMongo) {
            return getMongoRepository(entity , connectName)
        }
        return getRepository(entity , connectName)
    }

    /**
     * 获取 MongoDB Repo
     * @param entity
     * @param connectName
     */
    async getMongoRepo (entity: ObjectType<EntitySchema> , connectName = 'default') {
        return this.getRepo(entity , connectName , true)
    }

}

export default TypeormService
