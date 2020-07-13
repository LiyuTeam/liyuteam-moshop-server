import { Context, inject, provide } from "midway";

@provide("DictionaryService")
export class DictionaryService {
  @inject() ctx: Context;
  @inject("DictionaryEntity") DictionaryEntity: DictionaryEntityType;

  async getDictionary() {
    // const dictRepo = await getRepository(this.Dictionary as BaseEntity)
  }
}
