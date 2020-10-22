import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Town from "../models/Town";

export default class Towns extends Collection {
  model() {
    return Town;
  }

  routes() {
    return {
      fetch: "towns.index"
    };
  }
}
