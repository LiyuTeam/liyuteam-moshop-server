import { Column , PrimaryGeneratedColumn } from 'typeorm/index'
import { Field , Int } from 'type-graphql'

export class CMongoEntity {

    @Field({ description: 'Mongo ID' })
    @PrimaryGeneratedColumn()
    _id: string

    @Field(type => String , { description: 'uuid' })
    @Column('uuid')
    uid: string

    @Field({ description: '创建时间' })
    @Column()
    createdAt: Date

    @Field({ description: '更新时间' })
    @Column()
    updatedAt: Date

    @Field(type => Int , { description: '状态' , defaultValue: 1 })
    @Column({ type: 'int' , default: 1 })
    status: number

    @Field()
    @Column({ comment: '备注' , nullable: true })
    comment: string
}

/**
 * 用户账户
 */
export declare class IUserAccountEntity implements CMongoEntity {
    account: string
    password: string
    userName: string
    isAdmin: number
    secretToken: string
    phone: number
    _id: string
    comment: string
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date
}

/**
 * 数据字典 - 字典项
 */
export declare class IDictionaryEntity implements CMongoEntity {
    _id: string
    createdAt: Date
    updatedAt: Date
    status: number
    comment: string

    mainCode: string
    subCode: string
    title?: string | null
    name: string

    dictType: number
    uid: string

}

/**
 * 数据字典 - 字典值项
 */
export declare class IDictionaryValuesEntity implements CMongoEntity {
    fkDict: any

    title: string | null
    name: string

    valueType: number
    value?: any | null
    uid: string
    _id: string
    comment: string
    createdAt: Date
    status: number
    updatedAt: Date

}

export declare class IApplicationEntity implements CMongoEntity {
    _id: string
    comment: string
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date

    appID: string
    appSecret: string
    appName: string
    appCode: string
    appCreator: any
    appVersion: string

}
