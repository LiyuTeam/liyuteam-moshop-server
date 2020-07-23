import { daoBuilder , IBaseDaoPrototype } from '../util/DaoBuilder'
import { provide } from 'midway'

export const ABCDictionaryValueDao = daoBuilder('DictionaryValue')

/**
 * DictionaryValuesDao - 数据字典值 Dao
 */
@provide('DictionaryValueDao')
export class DictionaryValueDao extends ABCDictionaryValueDao implements IBaseDaoPrototype {
    connect = 'mongodb'
    entityName = 'DictionaryValueEntity'
}
