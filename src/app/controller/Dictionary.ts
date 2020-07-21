import { inject, controller, provide, Context } from "midway";

@provide()
@controller("/api/dictionary")
export class ApiDictionary {
  @inject() ctx: Context;
}
