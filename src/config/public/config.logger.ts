import { join as pathJoin } from 'path'

export default (appInfo: { root: string }) => {
    return {
        customLogger: {
            appLogger: {
                file: pathJoin(appInfo.root, 'logs/app.log')
            }
        }
    }
}
