import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, email, number } from "vue-mc/validation";
import _ from "lodash";

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
      name: null,
      email: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      email: [_.toString, _.trim]
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
