import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import User from "../models/User";

export default class Users extends Collection<User> {
  model(): typeof User {
    return User;
  }

  routes(): Record<string, any> {
    return {
      fetch: "users.index",
    };
  }
}
