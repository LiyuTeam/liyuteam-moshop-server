import { Column , MongoEntityManager } from 'typeorm/index'
import { Field } from 'type-graphql'

export declare class IMongoEntity extends MongoEntityManager {
    _id: string
    uid: string
    createdAt: Date
    updatedAt: Date
    status: number

    @Field()
    @Column({ comment: '备注' , nullable: true })
    comment: string
}

/**
 * 用户账户
 */
export declare class IUserAccountEntity extends IMongoEntity {
    account: string
    password: string
    userName: string
    isAdmin: number
    secretToken: string
    phone: number
}

/**
 * 数据字典 - 字典项
 */
export declare class IDictionaryEntity extends IMongoEntity {
    mainCode: string
    subCode: string
    title?: string | null
    name: string

    dictType: number
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date

}

/**
 * 数据字典 - 字典值项
 */
export declare abstract class IDictionaryValuesEntity extends IMongoEntity {
    fkDict: any

    title: string | null
    name: string

    valueType: number
    value?: any | null
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date

}
