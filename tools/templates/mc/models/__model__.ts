import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { __model__Data } from "../types/__model__";

class __model__ extends Model {
  defaults(): Record<string, any> {
    return {
      id: null
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null
    };
  }

  validation(): Record<string, any> {
    return {};
  }

  routes(): Record<string, any> {
    return {
      fetch: "__route__(noCase).show",
      create: "__route__(noCase).store",
      update: "__route__(noCase).update",
      delete: "__route__(noCase).destroy"
    };
  }
}

interface __model__ extends Model, __model__Data { }
export default __model__;
