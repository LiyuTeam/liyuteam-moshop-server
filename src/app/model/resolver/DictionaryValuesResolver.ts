import { inject , provide , scope , ScopeEnum } from 'midway'
import { Field , InputType , Resolver } from 'type-graphql'
import { resolverBuilder } from '../util/ResolverBuilder'
import DictionaryValueEntity from '../entities/mongodb/Dictionary/DictionaryValueEntity'
import { IBaseDao } from '../util/DaoBuilder'

@InputType()
export class DictionaryValueInputType extends DictionaryValueEntity {
    @Field() _id: string
    @Field() createdAt: Date
    @Field() name: string
    @Field() status: number
    @Field() title: string
    @Field() uid: string
    @Field() updatedAt: Date
    @Field() valueType: number
}

const ABCDictionaryValueResolver =
    resolverBuilder(
        'DictionaryValue' ,
        DictionaryValueEntity ,
        DictionaryValueInputType)

@scope(ScopeEnum.Prototype)
@provide('DictionaryValuesResolver')
@Resolver()
export class DictionaryValuesResolver extends ABCDictionaryValueResolver {

    @inject('DictionaryValueDao')
    dictionaryValuesDao: IBaseDao

}
