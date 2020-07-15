import { provide , config } from 'midway'
import { ITypeormService , MidwayApplication } from '../interface'
import { Connection , EntitySchema , getConnection , getRepository , Repository } from 'typeorm/index'
import { DatabaseConfigType } from '../config'

@provide('TypeormService')
class TypeormService implements ITypeormService {
    app: MidwayApplication
    symbol: Symbol

    @config('dataBase')
    dataBaseConfig: Partial<DatabaseConfigType>

    async getConn (clientName: string): Promise<Connection> {
        return getConnection(clientName)
    }

    getConnLazy (clientName: string): Function {
        return (cn: string) => this.getConn(cn)
    }

    async getRepo (entity: EntitySchema , isMongo = false): Promise<Repository<any>> {
        return getRepository(entity)
    }

    async init (app: MidwayApplication): Promise<void> {
        this.app = app
    }

}

export default TypeormService
