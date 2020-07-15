import { Arg , Ctx , Mutation , Query , Resolver } from 'type-graphql'
import { Context } from 'egg'
import { inject , provide , scope , ScopeEnum , logger } from 'midway'
import { AddDictionaryInput } from '../inputer/DictionaryInputer'
import DictionaryEntity from '../entities/mongodb/Dictionary/DictionaryEntity'
import DictionaryValueEntity from '../entities/mongodb/Dictionary/DictionaryValueEntity'

@scope(ScopeEnum.Prototype)
@provide()
@Resolver()
export class DictionaryResolver {

    @logger()
    logger: any

    @inject()
    ctx: Context

    @inject(`DictionaryService`)
    dictionaryService: any

    @Query(() => [DictionaryEntity] ,
        { description: '获取多个数据字典项' })
    async dictionaries (
        @Arg('mainCode' , { nullable: true }) mainCode?: string ,
        @Arg('subCode' , { nullable: true }) subCode?: string
    ) {
        const result =
            await this.dictionaryService.list({
                mainCode ,
                subCode
            } as Partial<DictionaryEntity>)

        return result as [DictionaryEntity]
    }

    @Query(() => DictionaryEntity ,
        { description: '获取单个数据字典项' })
    async dictionary (
        @Arg('mainCode') mainCode: string ,
        @Arg('subCode') subCode: string ,
    ) {
        const result =
            await this.dictionaryService.get(
                {
                    mainCode: mainCode ,
                    subCode: subCode
                } as Partial<DictionaryEntity>
            )

        return result as DictionaryEntity
    }

    @Query(() => [DictionaryValueEntity] ,
        { description: '获取单个数据项下到多个字典值' })
    async dictionaryValues (
        @Ctx() ctx: Context ,
        @Arg('fkDict' , {}) fkDict?: string
    ) {
        const result = await ctx.service.dictionary
        return result
    }

    @Mutation(() => DictionaryEntity ,
        { description: '新增数据字典' })
    async addDictionary (
        @Arg('data') doc: AddDictionaryInput
    ) {
        const result =
            await this.dictionaryService.add(doc , {}) as Partial<DictionaryEntity>
        return result
    }
}

