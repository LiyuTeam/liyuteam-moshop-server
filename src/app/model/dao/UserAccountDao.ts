import { provide , inject } from 'midway'
import { IUserAccountDao , MidwayApplication } from '../../../interface'
import { BaseDao } from './BaseDao'

@provide('UserAccountDao')
export class UserAccountDao extends BaseDao implements IUserAccountDao {

    app: MidwayApplication
    symbol: Symbol

    @inject('UserAccountEntity')
    userAccountEntity: Promise<any>

    async add (doc: any , props?: any) {
        const me = this ,
            userAccountRepo = await this.typeormService
                .getMongoRepo('UserAccountEntity' , 'mongodb') ,
            result = await userAccountRepo
                .save(doc)
                .then(res => {
                    me.logger.debug('UserAccount created is ok' , res)
                })

        return result
    }

    del (where: any , delTruly?: boolean): Promise<any> | void {
        return undefined
    }

    get (where: any): Promise<any> | void {
        return undefined
    }

    init (app: MidwayApplication): Promise<void> {
        return Promise.resolve(undefined)
    }

    list (where: any): Promise<any> | void {
        return undefined
    }

    modify (where: any , doc: any): Promise<any> | void {
        return undefined
    }

}
