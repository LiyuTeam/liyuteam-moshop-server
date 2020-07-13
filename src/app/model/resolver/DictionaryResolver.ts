import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "egg";
import Dictionary from "../entities/mongodb/Dictionary/Dictionary";
import DictionaryValue from "../entities/mongodb/Dictionary/DictionaryValue";
import { provide, inject } from "midway";
import { AddDictionaryInput } from "../inputer/DictionaryInputer";

const SYMBOL = "DictionaryResolver";

@provide(SYMBOL)
@Resolver()
export class DictionaryResolver {
  @inject()
  ctx: Context;

  @Query(() => [Dictionary])
  async getDictionary(
    @Arg("mainCode", { nullable: true }) mainCode?: string,
    @Arg("subCode", { nullable: true }) subCode?: string
  ) {
    const result = (await this.ctx.service.dictionary.list({
      mainCode,
      subCode
    } as DictionaryEntityType)) as [Dictionary];

    return result;
  }

  @Query(() => [DictionaryValue])
  async getDictionaryValues(
    @Ctx() ctx: Context,
    @Arg("fkDict", {}) fkDict?: string
  ) {
    const result = await ctx.service.dictionary;
    return result;
  }

  @Mutation(() => Dictionary, { description: "新增数据字典" })
  async addDictionary(
    @Arg("data") doc: AddDictionaryInput
  ): Promise<Partial<Dictionary>> {
    const result = (await this.ctx.service.dictionary.add(doc)) as Partial<
      Dictionary
    >;
    return result;
  }
}
