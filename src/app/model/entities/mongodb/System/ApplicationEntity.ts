import { IApplicationEntity } from '../interface'
import { Column , Entity , PrimaryGeneratedColumn } from 'typeorm/index'
import { Field } from 'type-graphql'
import { provide } from 'midway'

@provide('ApplicationEntity')
@Entity('ApplicationEntity')
export class ApplicationEntity implements IApplicationEntity {
    @Field()
    @PrimaryGeneratedColumn()
    _id: string

    @Field()
    @Column()
    appCode: string

    @Field()
    @Column()
    appCreator: any

    @Field()
    @Column()
    appID: string

    @Field()
    @Column()
    appName: string

    @Field()
    @Column()
    appSecret: string

    @Field()
    @Column()
    appVersion: string

    @Field()
    @Column()
    comment: string

    @Field()
    @Column()
    createdAt: Date

    @Field()
    @Column()
    status: number

    @Field()
    @Column()
    uid: string

    @Field()
    @Column()
    updatedAt: Date

} 