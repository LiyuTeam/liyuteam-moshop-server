import { Column , Entity , PrimaryGeneratedColumn } from 'typeorm'
import { CMongoEntity , IUserAccountEntity } from '../interface'
import { snakeCase } from 'typeorm/util/StringUtils'
import { provide } from 'midway'

export const SYMBOL = 'UserAccountEntity'

/**
 * UserAccount Entity
 * @description 用户账号表
 */
@provide(SYMBOL)
@Entity({ name: snakeCase(SYMBOL) })
class UserAccountEntity extends CMongoEntity implements IUserAccountEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    account: string

    @Column({ default: null })
    password: string

    @Column({ default: 1 })
    status: number

    @Column({ default: 0 , comment: '是否管理员' })
    isAdmin: number

    @Column({ default: null , comment: '手机' })
    phone: number

    @Column({ default: null , comment: '用户秘钥' })
    secretToken: string

    @Column({ default: null , comment: '创建时间' })
    createdAt: Date

    @Column({ default: null , comment: '更新时间' })
    updatedAt: Date

    @Column({ default: null , comment: '用户昵称' })
    userName: string
}

export default UserAccountEntity
