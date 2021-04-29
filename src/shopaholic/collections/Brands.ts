import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Brand from "../models/Brand";

export default class Brands extends Collection<Brand> {
  model(): typeof Brand {
    return Brand;
  }

  routes(): Record<string, any> {
    return {
      fetch: "brands.index",
    };
  }
}
