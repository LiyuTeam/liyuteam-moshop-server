import { Application } from 'midway'
import { Repository } from 'typeorm/index'
import ModelTypings from '../typings/src/index'

export interface IApiResult {
    news: NewsItem[]
}

export interface IModel extends ModelTypings.AnyClass {

}

interface NewsItem {
    id: string,
    title: string
}

export type MidwayApplication = Application

/**
 * Base-Service interface
 */
export interface IBaseService {
    app: Application
    symbol: Symbol

    init (app: Application): Promise<void>

}

export interface IModelService extends IBaseService {
    /**
     * add action
     * @param doc
     * @param props
     */
    add (doc: any , props?: any): Promise<any> | void

    /**
     * del action
     * @param where
     * @param delTruly
     */
    del (where: any , delTruly?: boolean): Promise<any> | void

    /**
     * get action
     * @param where
     */
    get (where: any): Promise<any> | void

    /**
     * list action
     * @param where
     */
    list (where: any): Promise<any> | void

    /**
     * modify action
     * @param where
     * @param doc
     */
    modify (where: any , doc: any): Promise<any> | void
}

/**
 * @description Api-Service abstractions
 */
export interface IApiService {
    index (): Promise<IApiResult>
}

/**
 * Graphql-Service abstractions
 */
export interface IGraphqlService extends IBaseService {
    logger: ILoggerService
}

/**
 * Logger-Service abstractions
 */
export interface ILoggerService extends IBaseService {
    log (): void
}

/**
 * Dictionary-Service abstractions
 */
export declare interface IDictionaryDao extends IModelService {
}

export declare interface ITypeormService extends IBaseService {

    /**
     * 获得仓库
     * @param entity
     * @param isMongo
     */
    getRepo (entity: any , connectName: string , isMongo: boolean): Promise<Repository<any>>

}
