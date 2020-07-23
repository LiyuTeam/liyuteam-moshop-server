import { Column , Entity , ManyToOne } from 'typeorm'
import { Field , Int , ObjectType } from 'type-graphql'
import { IDictionaryValuesEntity } from '../interface'
import DictionaryEntity from './DictionaryEntity'
import { provide } from 'midway'
import { ObjectIdColumn , PrimaryGeneratedColumn } from 'typeorm/index'

export const SYMBOL = 'DictionaryValueEntity'

@Entity({ name: SYMBOL })
@provide(SYMBOL)
@ObjectType(SYMBOL , { description: '字典值' })
class DictionaryValueEntity implements IDictionaryValuesEntity {
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

    @Field() @ObjectIdColumn()
    _id: string

    @Field() @Column()
    comment: string

    @Field() @Column()
    createdAt: Date

    @Field() @Column()
    status: number

    @Field() @PrimaryGeneratedColumn('uuid')
    uid: string

    @Field() @Column()
    updatedAt: Date
}

export default DictionaryValueEntity
