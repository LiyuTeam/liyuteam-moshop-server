import { inject , provide , scope , ScopeEnum } from 'midway'
import { Field , InputType , Resolver } from 'type-graphql'
import { createResolver } from '../util/ResolverBuilder'
import DictionaryValueEntity from '../entities/mongodb/Dictionary/DictionaryValueEntity'
import { ABCDictionaryValueDao } from '../dao/dictionaryValuesDao'
import { IBaseInput } from '../util/InputBuilder'

@InputType()
export class DictionaryValueInputType implements IBaseInput , Partial<DictionaryValueEntity> {
    @Field() _id: string
    comment: string
    createdAt: Date
    fkDict: any
    name: string
    status: number
    title: string | null
    uid: string
    updatedAt: Date
    valueType: number
}

const ABCDictionaryValueResolver =
    createResolver('DictionaryValue' , DictionaryValueEntity , DictionaryValueInputType)

@scope(ScopeEnum.Prototype)
@provide('DictionaryValuesResolver')
@Resolver()
export class DictionaryValuesResolver extends ABCDictionaryValueResolver {

    @inject('DictionaryValueDao')
    dictionaryValuesDao: typeof ABCDictionaryValueDao

}
