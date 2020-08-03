import {
    Column ,
    CreateDateColumn ,
    Entity ,
    Generated , ManyToMany ,
    PrimaryGeneratedColumn ,
    UpdateDateColumn
} from 'typeorm/index'
import { IUserRoleEntity } from '../../interface'
import { provide } from 'midway'
import { Field , ObjectType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import UserRolePermissionEntity from './UserRolePermissionEntity'

export const SYMBOL = 'UserRoleEntity'

@provide(SYMBOL)
@Entity(SYMBOL)
@ObjectType({ description: '用户角色表' })
class UserRoleEntity implements IUserRoleEntity {
    @Field() @PrimaryGeneratedColumn() _id: string
    @Field() @Column() comment: string
    @Field() @CreateDateColumn() createdAt: Date
    @Field() @Column() @IsNotEmpty() name: string
    @Field() @Column() status: number
    @Field() @Generated('uuid') uid: string
    @Field() @UpdateDateColumn() updatedAt: Date

    @Field() @ManyToMany(type => UserRolePermissionEntity , item => item.uid) userRolePermissions: UserRolePermissionEntity[]
}

export default UserRoleEntity
