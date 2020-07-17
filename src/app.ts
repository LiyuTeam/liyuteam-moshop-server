import 'reflect-metadata'
import { Application , IBoot } from 'midway'

class AppBoot implements IBoot {
    private readonly app: Application

    constructor (app: Application) {
        this.app = app
    }

    async didReady () {
        /**
         * 服务初始化
         */
        const { app } = this
        app.logger.info('Application Started!!')

        const typeormService = await app.applicationContext.getAsync('TypeormService')
        await typeormService.init(app)
        app.logger.info(`TypeormService is ok , there are connection ${Object.keys(typeormService.connections).length} db created`)

        const graphqlService = await app.applicationContext.getAsync('GraphqlService')
        await graphqlService.init(app)
        app.logger.info('GraphqlService is ok , listen http://localhost:7001/graphql')
    }
}

export default AppBoot
