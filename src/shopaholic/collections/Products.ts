import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Product from "../models/Product";

export default class Products extends Collection {
  model() {
    return Product;
  }

  routes() {
    return {
      fetch: "products.index"
    };
  }

  /**
   * @returns {Products} Fetch active categories only
   */
  byActive(): Products {
    return this.filterBy({ active: 1 });
  }
}
