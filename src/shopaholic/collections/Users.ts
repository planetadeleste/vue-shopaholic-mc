import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import User from "../models/User";

export default class Users extends Collection {
  model() {
    return User;
  }

  routes() {
    return {
      fetch: "users.index"
    };
  }
}
