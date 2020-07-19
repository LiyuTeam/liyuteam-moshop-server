import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import DictionaryValueEntity from './DictionaryValueEntity'
import { IDictionaryEntity } from '../interface'
import { snakeCase } from 'typeorm/util/StringUtils'
import { Min } from 'class-validator'

export const SYMBOL = 'Dictionary'

@Entity({ name: `sys_${snakeCase(SYMBOL)}` })
@ObjectType({ description: '数据字典项' })
class DictionaryEntity implements IDictionaryEntity {

    @Field() @PrimaryGeneratedColumn()
    _id: string

    @Field() @CreateDateColumn()
    createdAt: Date

    @Field() @UpdateDateColumn()
    updatedAt: Date

    @Field() @Column()
    status: number

    @Field() @Column()
    comment: string

    @Field() @PrimaryGeneratedColumn('uuid')
    uid: string

    @Field(type => Int, { description: '字典项类型' })
    @Column({ type: 'int', default: 1 })
    dictType: number

    @Field(type => String, { description: '字典项主Code' })
    @PrimaryColumn({ nullable: false })
    @Min(2)
    mainCode: string

    @Field({ description: '字典项从Code', nullable: false })
    @PrimaryColumn({ nullable: false })
    @Min(2)
    subCode: string

    @Field({ description: '字典项名' })
    @PrimaryColumn()
    name: string

    @Field(type => String, { description: '字典项标题', nullable: true })
    @Column({ nullable: true })
    title?: string | null

    @Field(type => [DictionaryValueEntity], { description: '字典项值', nullable: true })
    @Column()
    dictValues?: [DictionaryValueEntity]
}

export default DictionaryEntity
