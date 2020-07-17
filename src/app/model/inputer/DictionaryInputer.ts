import { Field , InputType } from 'type-graphql'
import DictionaryEntity from '../entities/mongodb/Dictionary/DictionaryEntity'

@InputType({ description: '增加一个数据字典' })
export class AddDictionaryInput implements Partial<DictionaryEntity> {

    @Field({ nullable: true , defaultValue: 1 })
    dictType?: number

    @Field()
    mainCode: string

    @Field({ nullable: true })
    name?: string

    @Field()
    subCode: string

    @Field({ nullable: true })
    title?: string
}
