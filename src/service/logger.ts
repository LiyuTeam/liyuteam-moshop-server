import { Application , inject , provide } from 'midway'
import { ILoggerService } from '../interface'

export const SYMBOL = 'LoggerService'

/**
 * Logger 日志服务
 * @description 一个用于全局使用到日志服务
 */
@provide(SYMBOL)
class LoggerService implements ILoggerService {

    app: Application
    symbol: Symbol

    constructor () {
        this.symbol = Symbol(SYMBOL)
    }

    async init (app: Application): Promise<void> {

    }

    @inject()
    readonly baseDir: string

    log () {
        console.log(... arguments)
    }

}

export default LoggerService
