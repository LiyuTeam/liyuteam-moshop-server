import { ClassType } from 'type-graphql'
import { EntitySchema } from 'typeorm/index'
import { inject , logger } from 'midway'
import { ITypeormService } from '../../../interface'

export declare interface IBaseDao {

    /**
     * add action
     * @param doc
     * @param props
     */
    add (doc: any , props?: any): Promise<any> | void

    /**
     * del action
     * @param where
     * @param delTruly
     */
    del (where: any , delTruly?: boolean): Promise<any> | void

    /**
     * get action
     * @param where
     */
    get (where: any): Promise<any> | void

    /**
     * list action
     * @param where
     */
    list (where: any): Promise<any> | void

    /**
     * modify action
     * @param where
     * @param doc
     */
    modify (where: any , doc: any): Promise<any> | void
}

export function createDao<T extends ClassType> (suffix: string , entityCls: T): any {
    abstract class ABCBaseDAO implements IBaseDao {

        abstract connect: string

        @inject('typeormService')
        typeormService: ITypeormService
        @inject(`${suffix}`)
        entity: EntitySchema
        @logger('appLogger')
        logger: typeof console

        async add (doc: any , props?: any) {
            return this.typeormService
                .getRepo(this.entity , this.connect , true)
                .then(res => res.create(doc))
        }

        async del (where: any , delTruly?: boolean) {
            return this.typeormService
                .getRepo(this.entity , this.connect , true)
                .then(res => res.remove(where))
        }

        async get (where: any) {
            return this.typeormService
                .getRepo(this.entity , this.connect , true)
                .then(res => res.findOne(where))
        }

        async list (where: any) {
            return this.typeormService
                .getRepo(this.entity , this.connect , true)
                .then(res => res.find(where))
        }

        async modify (where: any , doc: any) {
            return this.typeormService
                .getRepo(this.entity , this.connect , true)
                .then(({ save }) => save(Object.assign({} , where , doc))
                )
        }

    }

    return ABCBaseDAO
}
