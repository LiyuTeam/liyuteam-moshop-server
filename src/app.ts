import 'reflect-metadata';
import {Application} from 'midway';
// import {Application} from 'midway';
// import {IBoot} from 'midway';

module.exports = (app: Application) => {
    app.beforeStart(
        async () => {
            const graphqlService = await app.applicationContext.getAsync('GraphqlService');
            await graphqlService.start(app);
        }
    )
}
//
// export default class AppBoot implements IBoot {
//     private readonly app: Application;
//
//     constructor(app: Application) {
//         this.app = app;
//     }
//
//     async didReady() {
//         const {app} = this;
//         await app.applicationContext.getAsync('LoggerService');
//         const graphqlService = await app.applicationContext.getAsync('GraphqlService');
//         await graphqlService.start(app);
//     }
// }
