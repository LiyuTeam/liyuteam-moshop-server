import { BaseEntity , EntitySchema , SaveOptions } from 'typeorm/index'

declare class EntityIMPL implements BaseEntity {
    uid: string
    createdAt: Date
    updatedAt: Date
    status: number

    hasId (): boolean

    recover (options?: SaveOptions): Promise<this>

    reload (): Promise<void>

    remove (options?: RemoveOptions): Promise<this>

    save (options?: SaveOptions): Promise<this>

    softRemove (options?: SaveOptions): Promise<this>
}

/**
 * 用户账户
 */
declare class IUserAccountEntity {
    account: string
    password: string
    userName: string
    isAdmin: number
    secretToken: string
    phone: number
}

/**
 * 数据字典 - 字典项
 */
declare abstract class IDictionaryEntity implements EntityIMPL {
    mainCode: string
    subCode: string
    title?: string | null
    name: string

    dictType: number
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date

    abstract hasId (): boolean

    abstract recover (options?: SaveOptions): Promise<this>
    abstract recover (options?: SaveOptions): Promise<this>

    abstract reload (): Promise<void>

    abstract remove (options?: RemoveOptions): Promise<this>
    abstract remove (options?: RemoveOptions): Promise<this>

    abstract save (options?: SaveOptions): Promise<this>
    abstract save (options?: SaveOptions): Promise<this>

    abstract softRemove (options?: SaveOptions): Promise<this>
    abstract softRemove (options?: SaveOptions): Promise<this>

}

/**
 * 数据字典 - 字典值项
 */
declare abstract class IDictionaryValuesEntity implements EntityIMPL {
    fkDict: any

    title: string | null
    name: string

    valueType: number
    value?: any | null
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date

    abstract hasId (): boolean

    abstract recover (options?: SaveOptions): Promise<this>
    abstract recover (options?: SaveOptions): Promise<this>

    abstract reload (): Promise<void>

    abstract remove (options?: RemoveOptions): Promise<this>
    abstract remove (options?: RemoveOptions): Promise<this>

    abstract save (options?: SaveOptions): Promise<this>
    abstract save (options?: SaveOptions): Promise<this>

    abstract softRemove (options?: SaveOptions): Promise<this>
    abstract softRemove (options?: SaveOptions): Promise<this>
}

declare abstract class DictionaryCategoryEntityABCType implements EntityIMPL {
    name: string
    title: string | null
    createdAt: Date
    status: number
    uid: string
    updatedAt: Date
}
