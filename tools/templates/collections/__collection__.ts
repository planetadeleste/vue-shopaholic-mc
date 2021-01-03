import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import __model__ from "../models/__model__";

export default class __collection__ extends Collection<__model__> {
  model() {
    return __model__;
  }

  routes() {
    return {
      fetch: "__route__(noCase).index"
    };
  }
}
