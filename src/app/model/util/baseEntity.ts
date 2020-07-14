import {
  Column,
  CreateDateColumn,
  Generated,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";
import { Field } from "type-graphql";

export class MongodbEntity implements EntityIMPL {
  @ObjectIdColumn({ comment: "_id" })
  _id: ObjectID | string;

  @Field()
  @Column({ comment: "状态(1可用2禁用3删除)", default: 1 })
  status: number;

  @Field()
  @Generated("uuid")
  @Column({ comment: "唯一ID(自动)" })
  uid: string;

  @Field()
  @CreateDateColumn({ comment: "创建日期" })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ comment: "更新日期" })
  updated_at: Date;

  @Field()
  @Column({ comment: "备注", nullable: true })
  comment: string;
}
