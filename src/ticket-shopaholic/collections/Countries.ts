import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Country from "../models/Country";

export default class Countries extends Collection {
  model() {
    return Country;
  }

  routes() {
    return {
      fetch: "countries.index"
    };
  }
}
