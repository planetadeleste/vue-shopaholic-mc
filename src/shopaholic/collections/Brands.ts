import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Brand from "../models/Brand";

export default class Brands extends Collection<Brand> {
  model() {
    return Brand;
  }

  routes() {
    return {
      fetch: "brands.index"
    };
  }
}
