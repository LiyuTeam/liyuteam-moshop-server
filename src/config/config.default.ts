import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway'
import GraphqlConfig from './public/config.graphql'
import DataBaseConfig from './public/config.database'
import LoggerConfig from './public/config.logger';
const path = require('path')
export type DefaultConfig = PowerPartial<EggAppConfig>

interface MyEggAppInfo extends EggAppInfo {
    appDir?: string
}

export default (appInfo: MyEggAppInfo) => {
    const config = {} as DefaultConfig
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1570684373953_5206'

    // add your config here
    config.middleware = []
    config.env = 'local'
    config.graphql = GraphqlConfig(appInfo)
    config.database = DataBaseConfig(appInfo)
    config.typeGraphQL = GraphqlConfig(appInfo)
    config.customLogger = LoggerConfig(appInfo).customLogger

    config.static = {
        dir: [path.join(appInfo.appDir, '/output'), path.join(appInfo.appDir, '/src/app/public')],
        prefix: '/'
    }

    config.security = {
        csrf: {
            ignore: ['/graphql']
        }
    }
    return config
}
