import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import _ from "lodash";

export default class Country extends Model {
  id!: number;
  name!: string;
  code!: string;
  is_pinned!: boolean;
  is_enabled!: boolean;
  is_default!: boolean;

  defaults() {
    return {
      id: null,
      name: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      code: [_.toString, _.trim]
    };
  }

  validation() {
    return {
      name: required.and(string),
      code: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "countries.show",
      create: "countries.store",
      update: "countries.update",
      delete: "countries.destroy"
    };
  }
}
