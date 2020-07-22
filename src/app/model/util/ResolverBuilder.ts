import { Arg , ClassType , Ctx , Int , Mutation , Query , Resolver } from 'type-graphql'
import { Context } from 'vm'
import { inject } from 'midway'
import { IBaseDao } from './DaoBuilder'
import { InputType } from 'zlib'
import { IBaseInput } from './InputBuilder'

export declare interface IResolver {
    add: any
    list: any
}

/**
 * 创造解析器
 */
export const createResolver = <T extends ClassType , I extends InputType> (
    suffix: string ,
    objectTypeCls: T ,
    inputTypeCls: IBaseInput
): any => {
    @Resolver({ isAbstract: true })
    abstract class ABCBaseResolver implements IResolver {
        protected items: T[] = []

        @inject(`${suffix}Dao`)
        dao: IBaseDao
        @inject(`${suffix}Input`)
        input: IBaseInput

        @Query(type => [objectTypeCls] , { name: `list${suffix}` })
        async list (
            @Ctx() ctx: Context ,
            @Arg('first' , type => Int) first: number
        ) {
            return this.items.slice(0 , first)
        }

        @Mutation(type => objectTypeCls , { name: `add${suffix}` })
        async add (
            @Ctx() ctx: Context ,
            @Arg('data' , { validate: true }) doc: typeof inputTypeCls
        ) {
            return this.dao.add(doc)
        }
    }

    return ABCBaseResolver
}
