import { Column , Entity , PrimaryColumn } from 'typeorm'
import { Field , Int , ObjectType } from 'type-graphql'
import DictionaryValueEntity from './DictionaryValueEntity'
import { CMongoEntity , IDictionaryEntity } from '../interface'
import { snakeCase } from 'typeorm/util/StringUtils'

export const SYMBOL = 'Dictionary'

@Entity({ name: `sys_${snakeCase(SYMBOL)}` })
@ObjectType({ description: '数据字典项' })
class DictionaryEntity extends CMongoEntity implements IDictionaryEntity {

    @Field(type => Int , { description: '字典项类型' })
    @Column({ type: 'int' , default: 1 })
    dictType: number

    @Field(type => String , { description: '字典项主Code' })
    @PrimaryColumn()
    mainCode: string

    @Field({ description: '字典项从Code' })
    @PrimaryColumn()
    subCode: string

    @Field({ description: '字典项名' })
    @PrimaryColumn()
    name: string

    @Field(type => String , { description: '字典项标题' , nullable: true })
    @Column({ nullable: true })
    title?: string | null

    @Field(type => [DictionaryValueEntity] , { description: '字典项值' , nullable: true })
    @Column()
    dictValues: [DictionaryValueEntity]
}

export default DictionaryEntity
