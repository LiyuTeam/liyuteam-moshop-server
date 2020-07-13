// import { Field, ObjectType } from "type-graphql";
//
// @ObjectType({ description: "数据字典" })
// export class Dictionary implements DictionaryEntityType {
//   @Field() _id: string;
//   @Field() created_at: Date;
//   @Field() dictType: number;
//   @Field() mainCode: string;
//   @Field() name: string;
//   @Field() status: number;
//   @Field() subCode: string;
//   @Field() title: string;
//   @Field() uid: string;
//   @Field() updated_at: Date;
// }
//
// @ObjectType({ description: "数据字典值" })
// export class DictionaryValue implements DictionaryValueEntityType {
//   @Field() fkDict: string;
//   @Field() name: string;
//   @Field() title: string;
//   @Field() value: string;
//   @Field() valueType: number;
//   @Field() created_at: Date;
//   @Field() status: number;
//   @Field() uid: string;
//   @Field() updated_at: Date;
// }
