import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { provide, scope, ScopeEnum, Context, Application } from 'midway'
import { AddDictionaryInput } from '../inputer/DictionaryInputer'
import DictionaryEntity from '../entities/mongodb/Dictionary/DictionaryEntity'
import DictionaryValueEntity from '../entities/mongodb/Dictionary/DictionaryValueEntity'
import { IDictionaryDao } from '../../../interface'

@scope(ScopeEnum.Prototype)
@provide('DictionaryResolver')
@Resolver()
export class DictionaryResolver {

    dictionaryDao: IDictionaryDao

    @Query(() => [DictionaryEntity], { description: '获取多个数据字典项' })
    async dictionaries(
        @Ctx() ctx: Context,
        @Arg('mainCode', { nullable: true }) mainCode?: string,
        @Arg('subCode', { nullable: true }) subCode?: string
    ) {
        const app = ctx.app as Partial<Application>

        this.dictionaryDao =
            await app.applicationContext.getAsync('dictionaryDao')

        const result =
            await this.dictionaryDao.list({
                mainCode,
                subCode
            } as Partial<DictionaryEntity>)

        ctx.logger.debug('Dictionary has listed', result)

        return result as [DictionaryEntity]
    }

    @Query(() => DictionaryEntity, { description: '获取单个数据字典项' })
    async dictionary(
        @Arg('mainCode') mainCode?: string,
        @Arg('subCode') subCode?: string) {
        const result =
            await this.dictionaryDao.get(
                {
                    mainCode: mainCode,
                    subCode: subCode
                } as Partial<DictionaryEntity>
            )

        return result as DictionaryEntity
    }

    @Query(() => [DictionaryValueEntity], { description: '获取单个数据项下到多个字典值' })
    async dictionaryValues(
        @Ctx() ctx: Context,
        @Arg('fkDict', {}) fkDict?: string
    ) {
        const result = await ctx.service.dictionary
        return result
    }

    /**
     * 新增
     * @param ctx
     * @param doc
     */
    @Mutation(() => DictionaryEntity, { description: '新增数据字典' })
    async addDictionary(
        @Ctx() ctx: Context,
        @Arg('data', { validate: true }) doc: AddDictionaryInput
    ) {
        const app = ctx.app as Partial<Application>

        this.dictionaryDao =
            await app.applicationContext.getAsync('dictionaryDao')


        const result =
            await this.dictionaryDao.add(doc, {}) as Partial<DictionaryEntity>

        ctx.logger.debug('Dictionary has created', result)
        return result
    }
}
