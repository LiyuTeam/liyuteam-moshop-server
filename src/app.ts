import 'reflect-metadata';


module.exports = (app: { [x: string]: any; beforeStart: (arg0: () => Promise<void>) => void; applicationContext: { getAsync: (arg0: string) => any; }; }) => {
    app.beforeStart(
        async () => {
            const extendList = ['eggTsGraphql', 'eggTsTypeorm'];
            extendList.map(item => app[item].init())
        }
    )
}

// export default class AppBoot implements IBoot {
//     private readonly app: Application;
//
//     constructor(app: Application) {
//         this.app = app;
//     }
//
//     async serverDidReady() {
//         const {app} = this;
//         await app.applicationContext.getAsync('typeGraphql');
//         await app.typeOrm.init();
//         app.logger.info(`${app.typeGraphql.symbol.toString()} started`);
//     }
// }
