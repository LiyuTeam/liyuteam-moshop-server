import {EggTsGraphql} from './lib/eggTsGraphql/EggTsGraphqlServer';
import {EggTsTypeorm} from './lib/eggTsTypeorm/TypeOrmService';
import {Application} from 'midway';

const getPrototype = (
    space: { SYMBOL: symbol; AppExtend: any },
    farther: Application
) => {
    if (!farther[space.SYMBOL.description as string]) {
        farther[space.SYMBOL.description as string] = new space.AppExtend(farther);
    }
    return farther[space.SYMBOL.description as string];
}

module.exports = {
    get eggTsGraphql() {
        if(!this[EggTsGraphql.SYMBOL]){
            this[EggTsGraphql.SYMBOL] = new EggTsGraphql.AppExtend(this,EggTsGraphql.SYMBOL);
        }
        return this[EggTsGraphql.SYMBOL];


        return getPrototype(EggTsGraphql, this);
    },
    get eggTsTypeorm() {
        return getPrototype(EggTsTypeorm, this)
    }
}