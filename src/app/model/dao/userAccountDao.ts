import { BaseDao } from './baseDao'
import { IUserAccountDao , MidwayApplication } from '../../../interface'
import { provide } from 'midway'

@provide('userAccountDao')
export class UserAccountDao extends BaseDao implements IUserAccountDao {
    async add (doc: any , props?: any) {
        const
            me = this ,
            userAccountRepo = await this.typeormService
                .getRepo('UserAccountEntity' , 'mongodb' , true
                ) ,
            result = await userAccountRepo
                .save(doc)
                .then(res => {
                    me.logger.debug('UserAccountDao created is ok,' , res)
                    return res
                })

        return result
    }

    del (where: any , delTruly?: boolean): Promise<any> | void {
        return undefined
    }

    async get (where: any) {
        const
            me = this ,
            userAccountRepo = await this.typeormService
                .getRepo('UserAccountEntity' , 'mongodb' , true) ,
            result = await userAccountRepo
                .find(where)
                .then(res => {
                    me.logger.debug('UserAccount  query is successful,' , res)
                    return res
                })

        return result
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
