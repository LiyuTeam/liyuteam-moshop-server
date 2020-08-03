import { IUserRolePermissionEntity } from '../../interface'
import { provide } from 'midway'
import {
    Column ,
    CreateDateColumn ,
    Entity ,
    Generated , JoinTable , ManyToMany ,
    PrimaryGeneratedColumn ,
    UpdateDateColumn
} from 'typeorm/index'
import { Field , ObjectType } from 'type-graphql'
import UserRoleEntity from './UserRoleEntity'

export const SYMBOL = 'UserRolePermissionEntity'

@provide(SYMBOL)
@Entity(SYMBOL)
@ObjectType({ description: '角色权限表' })
class UserRolePermissionEntity implements IUserRolePermissionEntity {
    @Field() @PrimaryGeneratedColumn() _id: string
    @Field() @Column() comment: string
    @Field() @CreateDateColumn() createdAt: Date
    @Field() @Column() name: string
    @Field() @Column() status: number
    @Field() @Column() type: string
    @Field() @Generated('uuid') uid: string
    @Field() @UpdateDateColumn() updatedAt: Date
    @Field() @Column() value: string

    @Field() @ManyToMany(type => UserRoleEntity , item => item.uid) @JoinTable() userRole: UserRoleEntity[]
}

export default UserRolePermissionEntity
