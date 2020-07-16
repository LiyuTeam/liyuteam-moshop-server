import { Application } from 'egg'
import { ConnectionOptions , createConnections } from 'typeorm'
import walkPath from './walkPath'
import path from 'path'
import fs from 'fs'

type appConfigTypeormType = {
    clients: [{ name: string }]
}

export namespace EggTsTypeorm {

    export const SYMBOL = Symbol('eggTsTypeorm')

    export class AppExtend {
        public symbol: symbol
        public entities: Map<any , any>
        private readonly _app: Application
        private readonly _config: any

        constructor (app: Application , symbol: symbol) {
            this._app = app
            this._config = app.config.typeorm as appConfigTypeormType
            this.symbol = symbol
        }

        async init () {
            await createConnections(this._config.clients)
            await this.autoEntities(this._app)
        }

        async autoEntities (app: Application) {
            //  整理clients / client配置
            const ormConfig = this._config , clients = new Map() , classes = new Map()

            if (!ormConfig) {
                app.logger.warn('autoEntities need config.typeorm in your application config.{env}.ts')
                return new Map()
            }

            if (ormConfig.client) {
                clients.set(ormConfig.client.name , ormConfig.client)
            }

            if (ormConfig.clients) {
                ormConfig.clients.map((client: { name: string }) => clients.set(client.name , client)
                )
            }

            if (clients.size > 0) {

                for (const name of clients.keys()) {
                    const client: ConnectionOptions = clients.get(name)

                    // 迭代client配置,遍历entity文件
                    client.entities?.forEach(p => {
                        const entitiesFiles = walkPath.walkFiles(path.join(app.baseDir , path.dirname(p.toString())).replace(/[\\]\*.*/ , '') , 'ts')
                        entitiesFiles?.forEach(entity => {
                            const entityPath = path.join(entity)

                            if (fs.existsSync(entityPath)) {
                                const Entity = import(entityPath)
                                //  entity以[client名字#entity名字]的KV形式挂载到ctx的autoEntities<Map>中
                                const EntityName = path.basename(entity).split('.')[ 0 ].toLowerCase().replace(/entity/i , '')
                                const ConnName = [name.toLowerCase() , EntityName].join('#')
                                app.logger.info('cur client is ' , name , ConnName)
                                classes.set(ConnName , Entity)
                                app.logger.debug('autoEntities get %s entity key is %s , from %s' , EntityName , ConnName , entityPath)
                            }
                        })
                    })

                    clients.set(name , client)
                }
            } else {
                app.logger.error('typeorm need configuration client or clients')
            }
            this.entities = classes
        }

    }
}

