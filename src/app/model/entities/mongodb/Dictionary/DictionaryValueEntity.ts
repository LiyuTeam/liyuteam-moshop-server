import { Column, Entity, ManyToOne } from "typeorm";
import DictionaryEntity from "./DictionaryEntity";
import { MongodbEntity } from "../../../util/baseEntity";
import { Field, Int, ObjectType } from "type-graphql";
import { toolkit } from "../../../../extend/helpers/toolkit";

const SYMBOL = "DictionaryValue";

// enum valueType {
//   "any",
//   "string",
//   "number",
//   "boolean",
//   "json",
//   "url"
// }

@Entity({ name: toolkit.Symbol2TableName(SYMBOL, "sys") })
@ObjectType(SYMBOL, { description: "字典值" })
class DictionaryValueEntity extends MongodbEntity
  implements IDictionaryValuesEntity {
  @Field(type => DictionaryEntity)
  @ManyToOne(
    type => DictionaryEntity,
    dictionary => dictionary.uid
  )
  fkDict: DictionaryEntity;

  @Field({ description: "字典值名" })
  @Column()
  name: string;

  @Field(type => String, { description: "字典值标题", nullable: true })
  @Column()
  title: string | null;

  @Field(type => String, { description: "字典值", nullable: true })
  @Column()
  value?: string | number | null;

  @Field(type => Int, { description: "字典值类型" })
  @Column({ type: "int" })
  valueType: number;
}

export default DictionaryValueEntity;
