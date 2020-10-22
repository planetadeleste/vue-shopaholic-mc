import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Vendor from "../models/Vendor";

export default class Vendors extends Collection {
  model() {
    return Vendor;
  }

  routes() {
    return {
      fetch: "vendors.index"
    };
  }
}
