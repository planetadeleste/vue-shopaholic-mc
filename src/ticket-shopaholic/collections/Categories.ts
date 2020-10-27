import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Category from "../models/Category";

export default class Categories extends Collection<Category> {
  model() {
    return Category;
  }

  routes() {
    return {
      fetch: "categories.index"
    };
  }

  /**
   * @returns {Categories} Fetch active categories only
   */
  byActive(): Categories {
    return this.filterBy({ active: 1 });
  }

  /**
   * @returns {Categories} Fetch categories by root tree
   */
  byTree(): Categories {
    return this.filterBy({ tree: 1 });
  }

  byEvents() {
    return this.filterBy({ isEvent: 1 });
  }

  byProducts() {
    return this.filterBy({ isNotEvent: 1 });
  }
}
