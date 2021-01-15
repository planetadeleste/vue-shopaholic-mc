import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, email, number } from "vue-mc/validation";
import { toNumber } from "lodash";

export default class Vendor extends Model {
  id!: number;
  user_id!: number;
  commission!: number;
  email!: string;
  name!: string;
  full_name!: string;
  avatar!: string;
  created_at!: string;
  updated_at!: string;

  defaults() {
    return {
      id: null,
      user_id: null,
      name: null,
      email: null,
      commission: null,
      full_name: null,
      avatar: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      user_id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      email: [cleanStr]
    };
  }

  validation() {
    return {
      user_id: required.and(number),
      name: required.and(string),
      email: required.and(email)
    };
  }

  routes() {
    return {
      fetch: "vendors.show",
      create: "vendors.store",
      update: "vendors.update",
      delete: "vendors.destroy"
    };
  }
}
