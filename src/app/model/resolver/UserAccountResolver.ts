import { Context, inject , provide , scope , ScopeEnum } from 'midway'
import { Arg , Ctx , Mutation , Query , Resolver } from 'type-graphql'
import { IUserAccountDao } from '../../../interface'
import UserAccountEntity from '../entities/mongodb/Account/UserAccountEntity'
import { AddUserAccountInput } from '../inputer/UserAccountInputer'

@scope(ScopeEnum.Prototype)
@provide('userAccountResolver')
@Resolver()
export class UserAccountResolver {
    @inject('userAccountDao')
    userAccountDao: IUserAccountDao

    @Query(() => [UserAccountEntity] , { description: '获取用户信息' })
    async user (
        @Ctx() ctx: Context ,
        @Arg('account' , { nullable: true }) account?: string
    ) {
        const result = await this.userAccountDao.get({ account })

        ctx.logger.debug('Account has listed' , result)

        return result
    }
    /**
     * add -  User
     * @param ctx
     * @param doc
     */
    @Mutation(() => UserAccountEntity , { description: '新增用户数据' })
    async addUserAccount (
        @Ctx() ctx: Context ,
        @Arg('data' , { validate: true }) doc: AddUserAccountInput
    ) {

        const result = await this.userAccountDao.add(doc , {})

        ctx.logger.info('Usr Account has created' , result)

        return result
    }
}
