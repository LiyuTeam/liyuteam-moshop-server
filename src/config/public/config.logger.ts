import { join as pathJoin } from 'path'

module.exports = (appInfo: { root: string }) => {
    return {
        customLoader: {
            appLogger: {
                file: pathJoin(appInfo.root , 'logs/app.log')
            }
        }
    }
}
