import "reflect-metadata";
import {Application, logger, provide} from "midway";
import {IBoot} from "midway";

@provide()
class AppBoot implements IBoot {
    private readonly app: Application;

    @logger('logger')
    logger: any

    constructor(app: Application) {
        this.app = app;
    }

    async didReady() {
        const {app} = this;

        // const graphqlService =
        //     await app.applicationContext.getAsync("graphqlService");
        await app.applicationContext.getAsync('apolloServer');
        // await graphqlService.start(app);
        console.log('GraphqlService is ok , listen http://localhost:7001/graphql');
    }
}

export default AppBoot