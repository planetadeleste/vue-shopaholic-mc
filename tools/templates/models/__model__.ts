import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import _ from "lodash";

export default class __model__ extends Model {
  id!: number;

  defaults() {
    return {
      id: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null
    };
  }

  validation() {
    return {};
  }

  routes() {
    return {
      fetch: "__route__(noCase).show",
      create: "__route__(noCase).store",
      update: "__route__(noCase).update",
      delete: "__route__(noCase).destroy"
    };
  }
}
