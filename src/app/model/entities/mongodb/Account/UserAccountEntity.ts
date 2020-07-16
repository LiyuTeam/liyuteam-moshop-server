import { Column , Entity , PrimaryGeneratedColumn } from 'typeorm'
import { toolkit } from '../../../../extend/helpers/toolkit'
import { IUserAccountEntity } from '../interface'

export const SYMBOL = 'UserAccount'

/**
 * UserAccount Entity
 * @description 用户账号表
 */
@Entity({ name: toolkit.Symbol2TableName(SYMBOL , 'account') })
class UserAccountEntity extends IUserAccountEntity {

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
