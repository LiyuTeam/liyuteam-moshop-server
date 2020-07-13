import { Field, InputType } from "type-graphql";
import Dictionary from "../entities/mongodb/Dictionary/Dictionary";

@InputType({ description: "增加一个数据字典" })
export class AddDictionaryInput implements Partial<Dictionary> {
  @Field({ nullable: true, defaultValue: 1 })
  dictType: number;

  @Field()
  mainCode: string;

  @Field()
  name: string;

  @Field()
  subCode: string;

  @Field({ nullable: true })
  title: string;
}
