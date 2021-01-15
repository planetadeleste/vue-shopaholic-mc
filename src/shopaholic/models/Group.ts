import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { required, string } from "vue-mc/validation";

export default class Group extends Model {
  id!: number;
  name!: string;
  code!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;

  defaults() {
    return {
      id: null,
      name: null,
      code: null,
      description: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr]
    };
  }

  validation() {
    return {
      name: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "groups.show",
      create: "groups.store",
      update: "groups.update",
      delete: "groups.destroy"
    };
  }
}
