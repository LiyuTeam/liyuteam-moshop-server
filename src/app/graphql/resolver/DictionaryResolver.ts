import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql';
import {Context} from 'egg';
import {AddDictionaryInput, Dictionary, DictionaryValue} from "../schema/DictionarySchema";

@Resolver()
export class DictionaryResolver {

    @Query(() => [Dictionary])
    async getDictionary(
        @Ctx() ctx: Context,
        @Arg('mainCode', {nullable: true}) mainCode?: string,
        @Arg('subCode', {nullable: true}) subCode?: string,
    ): Promise<[Dictionary]> {
        const result = await ctx.service.dictionary.list({
            mainCode, subCode,
        } as DictionaryEntityType) as [Dictionary];

        return result;
    }

    @Query(() => [DictionaryValue])
    async getDictionaryValues(
        @Ctx() ctx: Context,
        @Arg('fkDict', {}) fkDict?: string,
    ) {
        const result = await ctx.service.dictionary
    }

    @Mutation(() => Dictionary, {description: '新增数据字典'})
    async addDictionary(
        @Arg('data') doc: AddDictionaryInput,
        @Ctx() ctx: Context,
    ): Promise<Partial<Dictionary>> {
        const result = await ctx.service.dictionary.add(doc) as Partial<Dictionary>;
        return result;
    }
}
