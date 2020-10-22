import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, number } from "vue-mc/validation";
import _ from "lodash";
import Country from "./Country";

export default class State extends Model {
  id!: number;
  country_id!: number;
  name!: string;
  code!: string;
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
      code: [_.toString, _.trim],
      country: (obData: object) => {
        return new Country(obData);
      }
    };
  }

  validation() {
    return {
      country_id: required.and(number),
      name: required.and(string),
      code: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "states.show",
      create: "states.store",
      update: "states.update",
      delete: "states.destroy"
    };
  }
}
