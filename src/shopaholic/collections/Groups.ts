import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Group from "../models/Group";

export default class Groups extends Collection {
  model() {
    return Group;
  }

  routes() {
    return {
      fetch: "groups.index"
    };
  }
}
