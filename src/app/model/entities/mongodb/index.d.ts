interface EntityIMPL {
    uid: string;
    created_at: Date;
    updated_at: Date;
    status: number;
}

/**
 * 用户账户
 */
interface UserAccountEntityType {
    account: string;
    password: string;
    userName: string;
    isAdmin: number;
    secretToken: string;
    phone: number;
}

/**
 * 数据字典 - 字典项
 */
declare interface IDictionaryEntity implements EntityIMPL {
    mainCode: string;
    subCode: string;
    title?: string | null;
    name: string;

    dictType: number;
    created_at: Date;
    status: number;
    uid: string;
    updated_at: Date;
}

/**
 * 数据字典 - 字典值项
 */
declare interface IDictionaryValuesEntity implements EntityIMPL {
    fkDict: any;

    title: string | null;
    name: string;

    valueType: number;
    value?: any | null;
    created_at: Date;
    status: number;
    uid: string;
    updated_at: Date;
}

declare abstract class DictionaryCategoryEntityABCType implements EntityIMPL {
    name: string;
    title: string | null;
    created_at: Date;
    status: number;
    uid: string;
    updated_at: Date;
}
