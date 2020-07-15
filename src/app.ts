import 'reflect-metadata'
import { Application , IBoot } from 'midway'
class AppBoot implements IBoot {
    private readonly app: Application

    constructor (app: Application) {
        this.app = app
    }

    async didReady () {
        const { app } = this
        const graphqlService = await app.applicationContext.getAsync('GraphqlService')
        await graphqlService.init(app)
        console.log('GraphqlService is ok , listen http://localhost:7001/graphql')
    }
}

export default AppBoot
