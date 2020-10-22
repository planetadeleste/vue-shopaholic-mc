import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import _ from "lodash";
import UserAddress from "./UserAddress";
import { required, string, email } from "vue-mc/validation";

export default class User extends Model {
  id!: number;
  groups!: string[];
  email!: string;
  name!: string;
  last_name?: string | undefined;
  middle_name?: string | undefined;
  phone?: string | undefined;
  phone_list?: string[] | undefined;
  socialite_token?: string[] | undefined;
  avatar?: string | undefined;
  property?: any[] | undefined;
  address?: UserAddress[];
  role?: string;

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
      email: [_.toString, _.trim],
      fullName: () => {
        return _.chain([this.name, this.middle_name, this.last_name])
          .compact()
          .join(" ")
          .value();
      }
    };
  }

  validation() {
    return {
      name: required.and(string),
      email: required.and(email)
    };
  }

  routes() {
    return {
      fetch: "users.show",
      create: "users.store",
      update: "users.update",
      delete: "users.destroy"
    };
  }
}
