import { createDao } from '../util/DaoBuilder'
import DictionaryValueEntity from '../entities/mongodb/Dictionary/DictionaryValueEntity'
import { provide } from 'midway'

export const ABCDictionaryValueDao = createDao('DictionaryValueEntity' , DictionaryValueEntity)

/**
 * DictionaryValuesDao - 数据字典值 Dao
 */
@provide('DictionaryValueDao')
export class DictionaryValueDao extends ABCDictionaryValueDao {

    connect: 'Mongodb'
}
