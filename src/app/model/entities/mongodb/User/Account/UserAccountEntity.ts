import { Column , Entity , PrimaryGeneratedColumn } from 'typeorm'
import { IUserAccountEntity } from '../../interface'
import { snakeCase } from 'typeorm/util/StringUtils'
import { provide } from 'midway'
import { Field , ObjectType } from 'type-graphql'
import { CreateDateColumn , Generated , UpdateDateColumn } from 'typeorm/index'

export const SYMBOL = 'UserAccountEntity'

/**
 * UserAccount Entity
 * @description 用户账号表
 */
@provide(SYMBOL)
@Entity({ name: snakeCase(SYMBOL) })
@ObjectType({ description: '用户表' })
class UserAccountEntity implements IUserAccountEntity {

    @Field() @Column()
    account: string

    @Field() @Column({ default: null })
    password: string

    @Field() @Column({ default: 1 })
    status: number

    @Field() @Column({ default: 0 , comment: '是否管理员' })
    isAdmin: number

    @Field() @Column({ default: null , comment: '手机' })
    phone: number

    @Field() @Column({ default: null , comment: '用户秘钥' })
    secretToken: string

    @Field() @CreateDateColumn({ default: null , comment: '创建时间' })
    createdAt: Date

    @Field() @UpdateDateColumn({ default: null , comment: '更新时间' })
    updatedAt: Date

    @Field() @Column({ default: null , comment: '用户昵称' })
    userName: string
    @Field() @PrimaryGeneratedColumn() _id: string
    @Field() @Column() comment: string
    @Field() @Generated('uuid') uid: string
}

export default UserAccountEntity
