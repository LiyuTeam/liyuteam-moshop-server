import {provide, inject} from "midway"

/**
 * Logger 日志服务
 * @description 一个用于全局使用到日志服务
 */
@provide('LoggerService')
export default class Logger {
    @inject() readonly baseDir:string;

    log(){
        console.log(...arguments);
    }

}
