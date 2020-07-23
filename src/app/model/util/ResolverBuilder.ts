import { Arg , ClassType , InputType , Int , Mutation , Query , Resolver } from 'type-graphql'
import { inject } from 'midway'
import { IBaseDao } from './DaoBuilder'

export declare interface IResolver {
    add: any
    get: any
    modify: any
    del: any
    list: any

}

/**
 * ResolverBuilder
 * @param suffix 前缀 实体 suffix+'Entity',数据操作 suffix + 'Dao',突变名 [add|list|del|modify|get] + suffix
 * @param objectTypeCls 抽象实体对象 用于描述返回结果的实体
 * @param inputTypeCls 抽象输入器 用于描述接口允许输入的字段,会被内置继承为ResolverInnerInputType实现
 * @description 解析器创造器
 */
export function resolverBuilder<T extends ClassType> (
    suffix: string ,
    objectTypeCls: T ,
    inputTypeCls: T
): any {

    /**
     * 内建输入器
     */
    @InputType()
    class ResolverInnerInputType extends inputTypeCls {
    }

    @Resolver({ isAbstract: true })
    abstract class ABCBaseResolver implements IResolver {
        protected items: T[] = []

        @inject(`${suffix}Dao`)
        dao: IBaseDao

        /**
         * list 查询列表
         * @param first
         */
        @Query(type => [objectTypeCls] , { name: `list${suffix}` })
        async list (
            @Arg('first' , type => Int) first: number
        ) {
            return this.dao.list({})
        }

        /**
         * add 增加一个
         * @param doc
         */
        @Mutation(type => objectTypeCls , { name: `add${suffix}` })
        async add (
            @Arg('data' , { validate: true }) doc: ResolverInnerInputType
        ) {
            return this.dao.add(doc)
        }

        /**
         * get 查询一个
         * @param where
         */
        @Mutation(type => objectTypeCls , { name: `get${suffix}` })
        async get (
            @Arg('where' , { validate: true }) where: ResolverInnerInputType
        ) {
            return this.dao.get(where)
        }

        @Mutation(type => Boolean , { name: `del${suffix}` })
        async del (
            @Arg('where' , { validate: true }) where: ResolverInnerInputType
        ) {
            return Boolean(this.dao.del(where , false))
        }

        modify: any

    }

    return ABCBaseResolver
}
