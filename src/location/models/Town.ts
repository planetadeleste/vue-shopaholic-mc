import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, number } from "vue-mc/validation";
import { toNumber } from "lodash";
import State from "./State";

export default class Town extends Model {
  id!: number;
  state_id!: number;
  name!: string;
  slug!: string;
  description!: string;
  is_enabled!: boolean;
  state!: State;

  defaults() {
    return {
      id: null,
      name: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      slug: [cleanStr],
      state: (obData: object) => {
        return new State(obData);
      }
    };
  }

  validation() {
    return {
      state_id: required.and(number),
      name: required.and(string),
      slug: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "towns.show",
      create: "towns.store",
      update: "towns.update",
      delete: "towns.destroy"
    };
  }
}
