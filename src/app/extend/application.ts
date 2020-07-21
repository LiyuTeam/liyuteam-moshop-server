import { EggTsTypeorm } from "./applications/eggTsTypeorm/TypeOrmService";
import { Application } from "midway";

const getPrototype = (
  space: { SYMBOL: symbol; AppExtend: any },
  farther: Application
) => {
  if (!farther[space.SYMBOL.description as string]) {
    farther[space.SYMBOL.description as string] = new space.AppExtend(farther);
  }
  return farther[space.SYMBOL.description as string];
};

module.exports = {
  get eggTsTypeorm() {
    return getPrototype(EggTsTypeorm, this);
  }
};
