import lodash from 'lodash'

export const _ = lodash
export namespace toolkit {
    export const Symbol2TableName = (name: string , prefix = '' , sign = '_') =>
        `${prefix}${sign}${_.snakeCase(name)}`
}
