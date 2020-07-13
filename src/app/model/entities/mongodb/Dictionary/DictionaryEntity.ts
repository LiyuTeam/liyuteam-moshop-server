import {Column, Entity, PrimaryColumn} from 'typeorm';
import {MongodbEntity} from "../../../libs/baseEntity";
import { provide } from 'midway';

@Entity({name: 'Dictionary'})
@provide('DictionaryEntity')
class DictionaryEntity extends MongodbEntity implements DictionaryEntityType {
    @Column({comment: '字典类型', default: 1})
    dictType: number;
    @PrimaryColumn({comment: '主code'})
    mainCode: string;
    @PrimaryColumn({comment: '名字'})
    name: string;
    @PrimaryColumn({comment: '从code'})
    subCode: string;
    @Column({comment: '标题', nullable: true})
    title?: string | null
}

export default DictionaryEntity;
