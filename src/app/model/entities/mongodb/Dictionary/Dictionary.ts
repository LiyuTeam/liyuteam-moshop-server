import { Column, Entity, PrimaryColumn } from "typeorm";
import { MongodbEntity } from "../../../libs/baseEntity";
import { provide } from "midway";
import { Field, Int, ObjectType } from "type-graphql";
import { toolkit } from "../../../../extend/helpers/toolkit";

const SYMBOL = "Dictionary";

@provide("DictionaryEntity")
@Entity({ name: toolkit.Symbol2TableName(SYMBOL, "sys") })
@ObjectType({ description: "字典项" })
class Dictionary extends MongodbEntity implements DictionaryEntityType {
  @Field(type => Int, { description: "字典项类型" })
  @Column({ type: "int", default: 1 })
  dictType: number;

  @Field(type => String, { description: "字典项主Code" })
  @PrimaryColumn()
  mainCode: string;

  @Field({ description: "字典项从Code" })
  @PrimaryColumn()
  subCode: string;

  @Field({ description: "字典项名" })
  @PrimaryColumn()
  name: string;

  @Field(type => String, { description: "字典项标题", nullable: true })
  @Column({ nullable: true })
  title?: string | null;
}

export default Dictionary;
