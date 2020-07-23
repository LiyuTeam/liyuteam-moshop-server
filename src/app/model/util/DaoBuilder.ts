import { ClassType } from 'type-graphql'
import { inject , logger } from 'midway'
import { ITypeormService } from '../../../interface'
import { EntitySchema } from 'typeorm/index'

export declare interface IBaseDaoPrototype {
    connect: string
    entityName: string
}

/**
 * BaseDao Interface
 * @description 基础Dao接口,默认需要实现 [add|del|get|list|modify] 5种方法
 */
export declare abstract class IBaseDao implements IBaseDaoPrototype {

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

    abstract connect: string
    abstract entityName: string
}

/**
 * Dao构造器
 * @param suffix 前缀 用于内置引用,suffix+'Entity'
 * @description Dao构造器,通过suffix和entityCls抽象传参构造一个默认的Dao
 */
export function daoBuilder<T extends ClassType> (suffix: string): any {
    abstract class ABCBaseDAO implements IBaseDao {

        abstract connect: string //  typeorm 连接名 派生类必须实现的
        props: { [ p: string ]: any }   //  不知道干嘛的props
        entityName: string  //  dao 绑定的Entity名,默认是suffix+Entity

        // typeorm 服务
        @inject('typeormService')
        typeormService: ITypeormService
        //  绑定实体
        @inject(`${suffix}Entity`)
        entity: EntitySchema
        @logger('appLogger')
        logger: typeof console

        protected constructor (props: { [ propName: string ]: any }) {
            this.props = props
        }

        async add (doc: any , props?: any) {
            const
                entity = await this.entity ,
                repo = await this.typeormService
                    .getRepo(this.entityName , this.connect , true) ,
                result = await repo
                    .save(Object.assign({} , entity , doc))

            return result
        }

        async del (where: any , delTruly?: boolean) {
            return this.typeormService
                .getRepo(this.entityName , this.connect , true)
                .then(async (x) => x.remove(where))
        }

        async get (where: any) {
            const
                repo = await this.typeormService
                    .getRepo(this.entityName , this.connect , true) ,
                result = await repo
                    .findOne(where)

            return result
        }

        async list (where: any) {
            const
                repo = await this.typeormService
                    .getRepo(this.entityName , this.connect , true) ,
                result = await repo
                    .find(where)

            return result
        }

        async modify (where: any , doc: any) {
            const
                entity = await this.entity ,
                repo = await this.typeormService
                    .getRepo(this.entityName , this.connect , true) ,
                result = await repo
                    .save(Object.assign({} , entity , doc))

            return result
        }

    }

    return ABCBaseDAO
}
