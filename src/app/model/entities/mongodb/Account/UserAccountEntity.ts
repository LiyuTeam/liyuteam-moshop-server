import { Column , CreateDateColumn , Entity , PrimaryGeneratedColumn , UpdateDateColumn } from 'typeorm'
import { IUserAccountEntity } from '../interface'
import { provide } from 'midway'
import { Field , ObjectType, Int } from 'type-graphql'
import { ObjectIdColumn } from 'typeorm/index'
import { MaxLength , MinLength } from 'class-validator'

export const SYMBOL = 'UserAccountEntity'

/**
 * UserAccount Entity
 * @description 用户账号表
 */
@Entity({ name: SYMBOL })
@provide(SYMBOL)
@ObjectType({ description: '用户账号表' })
class UserAccountEntity implements IUserAccountEntity {

    @Field()
    @ObjectIdColumn()
    _id: string

    @Field()
    @PrimaryGeneratedColumn('uuid')
    uid: string

    @Field()
    @Column()
    account: string

    @Field()
    @Column({ default: null })
    password: string

    @Field(() => Int)
    @Column({ default: 1 })
    @MinLength(8)
    status: number

    @Field(() => Int)
    @Column({ default: 0 , comment: '是否管理员，eg：0，1' })
    isAdmin: number

    @Field(() => Int)
    @Column({ default: null , comment: '手机' })
    phone: number

    @Field()
    @Column({ default: null , comment: '用户秘钥' })
    secretToken: string

    @Field()
    @Column({ default: null , comment: '用户昵称' })
    @MinLength(2)
    @MaxLength(20)
    userName: string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field()
    @Column()
    comment: string
}

export default UserAccountEntity
