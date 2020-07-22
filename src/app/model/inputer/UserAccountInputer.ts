import { Field , InputType } from 'type-graphql'
import UserAccountEntity from '../entities/mongodb/Account/UserAccountEntity'

@InputType({ description: '增加一个用户数据' })
export class AddUserAccountInput implements Partial<UserAccountEntity> {

    @Field()
    account: string

    @Field()
    password: string
}
