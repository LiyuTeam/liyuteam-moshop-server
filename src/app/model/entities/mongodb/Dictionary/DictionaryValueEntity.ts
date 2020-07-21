import { Column , Entity , ManyToOne } from 'typeorm'
import { Field , Int , ObjectType } from 'type-graphql'
import { CMongoEntity , IDictionaryValuesEntity } from '../interface'
import DictionaryEntity from './DictionaryEntity'

export const SYMBOL = 'DictionaryValueEntity'

@Entity({ name: SYMBOL })
@ObjectType(SYMBOL , { description: '字典值' })
class DictionaryValueEntity extends CMongoEntity implements IDictionaryValuesEntity {
    @Field(type => DictionaryEntity)
    @ManyToOne(
        type => DictionaryEntity ,
        dictionary => dictionary.uid
    )
    fkDict: DictionaryEntity

    @Field({ description: '字典值名' })
    @Column()
    name: string

    @Field(type => String , { description: '字典值标题' , nullable: true })
    @Column()
    title: string | null

    @Field(type => String , { description: '字典值' , nullable: true })
    @Column()
    value?: string | number | null

    @Field(type => Int , { description: '字典值类型' })
    @Column({ type: 'int' })
    valueType: number
}

export default DictionaryValueEntity
